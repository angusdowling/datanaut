import pg from "pg";

/**
 * @swagger
 * components:
 *   schemas:
 *     AppRow:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The row ID
 *         table_id:
 *           type: string
 *           description: The table this row belongs to
 *         data:
 *           type: object
 *           description: The row data as key-value pairs
 *         created_by:
 *           type: string
 *           description: User ID who created this row
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - table_id
 *         - data
 *         - created_by
 *         - created_at
 *         - updated_at
 */

export type AppRow = {
  id: string;
  table_id: string;
  data: Record<string, unknown>;
  created_by: string;
  created_at: Date;
  updated_at: Date;
};

export async function getRows(tableId: string, db: pg.PoolClient) {
  const result = await db.query<AppRow>(
    `SELECT * FROM app_rows WHERE table_id = $1`,
    [tableId]
  );
  return result.rows;
}

export async function createRow(
  tableId: string,
  data: Record<string, unknown>,
  userId: string,
  db: pg.PoolClient
) {
  const result = await db.query<AppRow>(
    `INSERT INTO app_rows(table_id, data, created_by) VALUES($1, $2, $3) RETURNING *`,
    [tableId, data, userId]
  );
  return result.rows[0];
}

export async function updateRow(
  rowId: string,
  data: Record<string, unknown>,
  db: pg.PoolClient
) {
  const result = await db.query<AppRow>(
    `UPDATE app_rows SET data = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [data, rowId]
  );
  return result.rows[0];
}

export async function deleteRow(rowId: string, db: pg.PoolClient) {
  const result = await db.query<AppRow>(
    `DELETE FROM app_rows WHERE id = $1 RETURNING *`,
    [rowId]
  );
  return result.rows[0];
}
