import { PoolClient } from "pg";

export type AppRow = {
  id: string;
  table_id: string;
  data: Record<string, unknown>;
  created_by: string;
  created_at: Date;
  updated_at: Date;
};

export async function getRows(tableId: string, db: PoolClient) {
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
  db: PoolClient
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
  db: PoolClient
) {
  const result = await db.query<AppRow>(
    `UPDATE app_rows SET data = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [data, rowId]
  );
  return result.rows[0];
}

export async function deleteRow(rowId: string, db: PoolClient) {
  const result = await db.query<AppRow>(
    `DELETE FROM app_rows WHERE id = $1 RETURNING *`,
    [rowId]
  );
  return result.rows[0];
}
