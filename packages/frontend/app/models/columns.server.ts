import pg from "pg";

/**
 * @swagger
 * components:
 *   schemas:
 *     AppColumn:
 *       type: object
 *       required:
 *         - id
 *         - table_id
 *         - name
 *         - type
 *         - config
 *       properties:
 *         id:
 *           type: string
 *           description: The column's unique identifier
 *         table_id:
 *           type: string
 *           description: The ID of the table this column belongs to
 *         name:
 *           type: string
 *           description: The column's display name
 *         type:
 *           type: string
 *           description: The column's data type
 *         config:
 *           type: object
 *           description: Column-specific configuration
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when column was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when column was last updated
 *       example:
 *         id: "col_123"
 *         table_id: "tbl_456"
 *         name: "Created Date"
 *         type: "timestamp"
 *         config: {}
 *         created_at: "2023-01-01T00:00:00.000Z"
 *         updated_at: "2023-01-01T00:00:00.000Z"
 */
export type AppColumn = {
  id: string;
  table_id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
};

/**
 * Get all columns for a table
 * @param tableId - The ID of the table to get columns for
 * @param db - Database client
 * @returns Array of columns
 */
export async function getColumns(tableId: string, db: pg.PoolClient) {
  const result = await db.query<AppColumn>(
    `SELECT * FROM app_columns WHERE table_id = $1`,
    [tableId]
  );

  return result.rows;
}

/**
 * Create a new column
 * @param tableId - The ID of the table to add the column to
 * @param data - Column data
 * @param data.name - Column name
 * @param data.type - Column type
 * @param data.config - Column configuration
 * @param db - Database client
 * @returns The created column
 */
export async function createColumn(
  tableId: string,
  data: Omit<AppColumn, "id" | "table_id" | "created_at" | "updated_at">,
  db: pg.PoolClient
) {
  const result = await db.query<AppColumn>(
    `INSERT INTO app_columns(table_id, name, type, config) VALUES($1, $2, $3, $4) RETURNING *`,
    [tableId, data.name, data.type, data.config]
  );

  return result.rows[0];
}

/**
 * Update a column
 * @param columnId - The ID of the column to update
 * @param updates - Partial column data to update
 * @param [updates.name] - New column name
 * @param [updates.type] - New column type
 * @param [updates.config] - New column configuration
 * @param db - Database client
 * @returns The updated column
 */
export async function updateColumn(
  columnId: string,
  updates: Partial<Omit<AppColumn, "id" | "table_id" | "created_at">>,
  db: pg.PoolClient
) {
  const setClause = Object.keys(updates)
    .map((key, i) => `${key} = $${i + 1}`)
    .join(", ");
  const values = Object.values(updates);

  const result = await db.query<AppColumn>(
    `UPDATE app_columns SET ${setClause} WHERE id = $${
      values.length + 1
    } RETURNING *`,
    [...values, columnId]
  );
  return result.rows[0];
}

/**
 * Delete a column
 * @param columnId - The ID of the column to delete
 * @param db - Database client
 * @returns The deleted column
 */
export async function deleteColumn(columnId: string, db: pg.PoolClient) {
  const result = await db.query<AppColumn>(
    `DELETE FROM app_columns WHERE id = $1 RETURNING *`,
    [columnId]
  );
  return result.rows[0];
}
