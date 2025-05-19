--! Previous: sha1:a54624fef2adaecb5d67c7b2d0ab1e87515fb7d6
--! Hash: sha1:ef73b4d81bfd40e1d4556c1c27a9e24802cfeb7b

-- Drop existing objects if they exist
DROP TRIGGER IF EXISTS manage_row_positions ON app_rows;
DROP FUNCTION IF EXISTS update_row_positions();
DROP INDEX IF EXISTS idx_app_rows_table_position;

-- Add position column to app_rows table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'app_rows' 
        AND column_name = 'position'
    ) THEN
        ALTER TABLE app_rows ADD COLUMN position INTEGER;
    END IF;
END $$;

-- Add unique constraint for position within each table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE table_name = 'app_rows'
        AND constraint_name = 'app_rows_table_position_key'
    ) THEN
        ALTER TABLE app_rows ADD CONSTRAINT app_rows_table_position_key UNIQUE (table_id, position);
    END IF;
END $$;

-- Create index for position-based queries
CREATE INDEX IF NOT EXISTS idx_app_rows_table_position ON app_rows(table_id, position);

-- Create function to handle position updates
CREATE OR REPLACE FUNCTION update_row_positions()
RETURNS TRIGGER AS $$
DECLARE
    max_position INTEGER;
BEGIN
    -- When inserting a new row
    IF (TG_OP = 'INSERT') THEN
        -- If position is not specified, set it to the max position + 1
        IF NEW.position IS NULL THEN
            SELECT COALESCE(MAX(position), 0) + 1
            INTO NEW.position
            FROM app_rows
            WHERE table_id = NEW.table_id;
        END IF;
        
        -- Get the current max position
        SELECT COALESCE(MAX(position), 0)
        INTO max_position
        FROM app_rows
        WHERE table_id = NEW.table_id;

        -- If inserting at or beyond max position, no need to shift
        IF NEW.position > max_position THEN
            RETURN NEW;
        END IF;

        -- Shift positions of existing rows
        -- Use a temporary position to avoid unique constraint violations
        UPDATE app_rows
        SET position = position + 1000000
        WHERE table_id = NEW.table_id
        AND position >= NEW.position
        AND id != NEW.id;

        -- Now shift back to actual positions
        UPDATE app_rows
        SET position = position - 1000000 + 1
        WHERE table_id = NEW.table_id
        AND position > 1000000;
    END IF;

    -- When deleting a row
    IF (TG_OP = 'DELETE') THEN
        -- Shift positions of remaining rows
        UPDATE app_rows
        SET position = position - 1
        WHERE table_id = OLD.table_id
        AND position > OLD.position;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for position management
CREATE TRIGGER manage_row_positions
    BEFORE INSERT OR DELETE ON app_rows
    FOR EACH ROW
    EXECUTE FUNCTION update_row_positions();

-- Update existing rows to have sequential positions only if position is null
UPDATE app_rows r
SET position = nr.new_position
FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY table_id ORDER BY created_at) as new_position
    FROM app_rows
    WHERE position IS NULL
) nr
WHERE r.id = nr.id;
