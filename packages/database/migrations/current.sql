drop table if exists app_cells cascade;
CREATE TABLE app_cells (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  row_id UUID NOT NULL REFERENCES app_rows(id) ON DELETE CASCADE,
  column_id UUID NOT NULL REFERENCES app_columns(id) ON DELETE CASCADE,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(row_id, column_id)
);

CREATE INDEX idx_app_cells_row_column ON app_cells(row_id, column_id);

-- Remove obsolete data column in favour of app_cells
ALTER TABLE app_rows DROP COLUMN data;

-- Remove existing validation trigger
DROP TRIGGER IF EXISTS validate_app_rows_data ON app_rows;
DROP FUNCTION IF EXISTS validate_row_data;

CREATE OR REPLACE FUNCTION validate_cell_value()
RETURNS TRIGGER AS $$
DECLARE
  column_record RECORD;
  value JSONB := NEW.value;
BEGIN
  -- Get column definition
  SELECT * INTO column_record FROM app_columns WHERE id = NEW.column_id;

  IF column_record IS NULL THEN
    RAISE EXCEPTION 'Invalid column ID: %', NEW.column_id;
  END IF;

  -- Required field check (only for inserts/updates if value is NULL)
  IF column_record.is_required AND (value IS NULL OR value = 'null') THEN
    RAISE EXCEPTION 'Column % is required', column_record.name;
  END IF;

  -- Skip validation if value is null and not required
  IF value IS NULL OR value = 'null' THEN
    RETURN NEW;
  END IF;

  -- Type-specific validation
  CASE column_record.type
    WHEN 'single_line_text', 'long_text', 'phone_number', 'email', 'url' THEN
      IF jsonb_typeof(value) != 'string' THEN
        RAISE EXCEPTION 'Column % must be text', column_record.name;
      END IF;

    WHEN 'number', 'currency', 'percent', 'duration', 'rating', 'autonumber' THEN
      IF jsonb_typeof(value) != 'number' THEN
        RAISE EXCEPTION 'Column % must be a number', column_record.name;
      END IF;

    WHEN 'checkbox' THEN
      IF jsonb_typeof(value) != 'boolean' THEN
        RAISE EXCEPTION 'Column % must be a boolean', column_record.name;
      END IF;

    WHEN 'date', 'created_time', 'last_modified_time' THEN
      IF jsonb_typeof(value) != 'string' OR
         value::text !~ '^"\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})?)?"$' THEN
        RAISE EXCEPTION 'Column % must be a valid ISO 8601 date string', column_record.name;
      END IF;

    WHEN 'single_select' THEN
      IF jsonb_typeof(value) != 'string' OR
         NOT EXISTS (
           SELECT 1 FROM jsonb_array_elements_text(column_record.config->'options') opt
           WHERE opt = value#>>'{}'
         ) THEN
        RAISE EXCEPTION 'Column % must be one of the defined options', column_record.name;
      END IF;

    WHEN 'multi_select' THEN
      IF jsonb_typeof(value) != 'array' OR
         EXISTS (
           SELECT 1 FROM jsonb_array_elements_text(value) val
           WHERE NOT EXISTS (
             SELECT 1 FROM jsonb_array_elements_text(column_record.config->'options') opt
             WHERE opt = val
           )
         ) THEN
        RAISE EXCEPTION 'Column % must be an array of valid options', column_record.name;
      END IF;

    WHEN 'link_to_record' THEN
      IF jsonb_typeof(value) NOT IN ('string', 'array') OR
         (jsonb_typeof(value) = 'string' AND NOT EXISTS (
           SELECT 1 FROM app_rows WHERE id::text = value#>>'{}'
         )) OR
         (jsonb_typeof(value) = 'array' AND EXISTS (
           SELECT 1 FROM jsonb_array_elements_text(value) val
           WHERE NOT EXISTS (
             SELECT 1 FROM app_rows WHERE id::text = val
           )
         )) THEN
        RAISE EXCEPTION 'Column % must reference valid record ID(s)', column_record.name;
      END IF;

    WHEN 'user', 'created_by', 'last_modified_by' THEN
      IF jsonb_typeof(value) != 'string' OR NOT (value#>>'{}') ~ '^[0-9a-fA-F-]{36}$' THEN
        RAISE EXCEPTION 'Column % must be a valid UUID string (user ID)', column_record.name;
      END IF;

    WHEN 'attachment' THEN
      IF jsonb_typeof(value) != 'array' OR
         EXISTS (
           SELECT 1 FROM jsonb_array_elements(value) att
           WHERE att->>'url' IS NULL OR att->>'filename' IS NULL
         ) THEN
        RAISE EXCEPTION 'Column % must contain valid attachments (array of objects with url and filename)', column_record.name;
      END IF;

    -- TODO: 'formula', 'lookup', 'rollup', etc.
  END CASE;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
