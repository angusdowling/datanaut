import { PoolClient } from "pg";

export type AppTable = {
  id: string;
  workspace_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export async function getTables(workspaceId: string, db: PoolClient) {
  const result = await db.query<AppTable>(
    `SELECT * FROM app_tables WHERE workspace_id = $1`,
    [workspaceId]
  );
  return result.rows;
}

export async function createTable(
  workspaceId: string,
  name: string,
  db: PoolClient
) {
  const result = await db.query<AppTable>(
    `INSERT INTO app_tables(workspace_id, name) VALUES($1, $2) RETURNING *`,
    [workspaceId, name]
  );
  return result.rows[0];
}

export async function renameTable(
  tableId: string,
  name: string,
  db: PoolClient
) {
  const result = await db.query<AppTable>(
    `UPDATE app_tables SET name = $1 WHERE id = $2 RETURNING *`,
    [name, tableId]
  );
  return result.rows[0];
}

export async function deleteTable(tableId: string, db: PoolClient) {
  const result = await db.query<AppTable>(
    `DELETE FROM app_tables WHERE id = $1 RETURNING *`,
    [tableId]
  );
  return result.rows[0];
}

export async function updateTable(
  tableId: string,
  updates: Partial<Omit<AppTable, "id" | "workspace_id" | "created_at">>,
  db: PoolClient
) {
  const setClause = Object.keys(updates)
    .map((key, i) => `${key} = $${i + 1}`)
    .join(", ");
  const values = Object.values(updates);

  const result = await db.query<AppTable>(
    `UPDATE app_tables SET ${setClause} WHERE id = $${
      values.length + 1
    } RETURNING *`,
    [...values, tableId]
  );
  return result.rows[0];
}
