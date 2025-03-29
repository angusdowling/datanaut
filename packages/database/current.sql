-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create workspaces table
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create app_tables table
CREATE TABLE app_tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, name)
);

-- Create app_columns table
CREATE TABLE app_columns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_id UUID NOT NULL REFERENCES app_tables(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN (
    'single_line_text', 'long_text', 'link_to_record', 'attachment',
    'checkbox', 'multi_select', 'single_select', 'user', 'date',
    'phone_number', 'email', 'url', 'number', 'currency', 'percent',
    'duration', 'rating', 'formula', 'rollup', 'count', 'lookup',
    'created_time', 'last_modified_time', 'created_by', 'last_modified_by',
    'autonumber'
  )),
  config JSONB, -- Type-specific configuration (e.g. formula, rollup settings, currency format)
  position INTEGER NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT false,
  options JSONB, -- For select/multiselect types
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(table_id, name)
);

-- Create app_rows table
CREATE TABLE app_rows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_id UUID NOT NULL REFERENCES app_tables(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}',
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_app_tables_workspace ON app_tables(workspace_id);
CREATE INDEX idx_app_columns_table ON app_columns(table_id);
CREATE INDEX idx_app_rows_table ON app_rows(table_id);
CREATE INDEX idx_app_rows_data ON app_rows USING gin(data);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_app_tables_updated_at
  BEFORE UPDATE ON app_tables
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_app_columns_updated_at
  BEFORE UPDATE ON app_columns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_app_rows_updated_at
  BEFORE UPDATE ON app_rows
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create function to validate row data against column definitions
CREATE OR REPLACE FUNCTION validate_row_data()
RETURNS TRIGGER AS $$
DECLARE
  column_record RECORD;
  value JSONB;
  value_type TEXT;
BEGIN
  -- Check all required columns are present
  FOR column_record IN
    SELECT name, type, is_required
    FROM app_columns
    WHERE table_id = NEW.table_id
  LOOP
    value := NEW.data->column_record.name;
    
    IF column_record.is_required AND value IS NULL THEN
      RAISE EXCEPTION 'Column % is required', column_record.name;
    END IF;
    
    IF value IS NOT NULL THEN
      CASE column_record.type
        WHEN 'single_line_text', 'long_text', 'phone_number', 'email', 'url' THEN
          IF jsonb_typeof(value) != 'string' THEN
            RAISE EXCEPTION 'Column % must be text', column_record.name;
          END IF;
        WHEN 'number', 'currency', 'percent', 'duration', 'rating', 'autonumber' THEN
          IF jsonb_typeof(value) NOT IN ('number') THEN
            RAISE EXCEPTION 'Column % must be a number', column_record.name;
          END IF;
        WHEN 'checkbox' THEN
          IF jsonb_typeof(value) != 'boolean' THEN
            RAISE EXCEPTION 'Column % must be boolean', column_record.name;
          END IF;
        WHEN 'date', 'created_time', 'last_modified_time' THEN
          IF jsonb_typeof(value) != 'string' OR
             value::text !~ '^"\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})?)?"$' THEN
            RAISE EXCEPTION 'Column % must be a valid ISO date string', column_record.name;
          END IF;
        WHEN 'single_select' THEN
          IF jsonb_typeof(value) != 'string' OR
             NOT EXISTS (SELECT 1 FROM jsonb_array_elements_text(column_record.config->'options') opt WHERE opt = value#>>'{}') THEN
            RAISE EXCEPTION 'Column % must be one of the defined options', column_record.name;
          END IF;
        WHEN 'multi_select' THEN
          IF jsonb_typeof(value) != 'array' OR
             EXISTS (
               SELECT 1 FROM jsonb_array_elements_text(value) val
               WHERE NOT EXISTS (SELECT 1 FROM jsonb_array_elements_text(column_record.config->'options') opt WHERE opt = val)
             ) THEN
            RAISE EXCEPTION 'Column % values must be from the defined options', column_record.name;
          END IF;
        WHEN 'link_to_record' THEN
          IF jsonb_typeof(value) NOT IN ('string', 'array') OR
             (jsonb_typeof(value) = 'array' AND EXISTS (
               SELECT 1 FROM jsonb_array_elements_text(value) val
               WHERE NOT EXISTS (SELECT 1 FROM app_rows WHERE id::text = val)
             )) OR
             (jsonb_typeof(value) = 'string' AND NOT EXISTS (SELECT 1 FROM app_rows WHERE id::text = value#>>'{}')) THEN
            RAISE EXCEPTION 'Column % must reference valid record(s)', column_record.name;
          END IF;
        WHEN 'user', 'created_by', 'last_modified_by' THEN
          IF jsonb_typeof(value) != 'string' OR NOT uuid_is_valid(value#>>'{}') THEN
            RAISE EXCEPTION 'Column % must be a valid user ID', column_record.name;
          END IF;
        WHEN 'attachment' THEN
          IF jsonb_typeof(value) != 'array' OR
             EXISTS (
               SELECT 1 FROM jsonb_array_elements(value) att
               WHERE att->>'url' IS NULL OR att->>'filename' IS NULL
             ) THEN
            RAISE EXCEPTION 'Column % must contain valid attachments', column_record.name;
          END IF;
      END CASE;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add data validation trigger
CREATE TRIGGER validate_app_rows_data
  BEFORE INSERT OR UPDATE ON app_rows
  FOR EACH ROW
  EXECUTE FUNCTION validate_row_data();