import pg from "pg";

/**
 * @swagger
 * components:
 *   schemas:
 *     AppTable:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The table ID
 *         workspace_id:
 *           type: string
 *           description: The workspace this table belongs to
 *         name:
 *           type: string
 *           description: The table name
 *         created_by:
 *           type: string
 *           format: string
 *           description: The user who created this table
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - name
 *         - workspace_id
 *         - created_by
 *         - created_at
 *         - updated_at
 */

export type AppTable = {
  id: string;
  workspace_id: string;
  name: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
};

export async function getTables(workspaceId: string, db: pg.PoolClient) {
  const result = await db.query<AppTable>(
    `SELECT * FROM app_tables WHERE workspace_id = $1`,
    [workspaceId]
  );
  return result.rows;
}

export async function createTable(
  workspaceId: string,
  name: string,
  db: pg.PoolClient
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
  db: pg.PoolClient
) {
  const result = await db.query<AppTable>(
    `UPDATE app_tables SET name = $1 WHERE id = $2 RETURNING *`,
    [name, tableId]
  );
  return result.rows[0];
}

export async function deleteTable(tableId: string, db: pg.PoolClient) {
  const result = await db.query<AppTable>(
    `DELETE FROM app_tables WHERE id = $1 RETURNING *`,
    [tableId]
  );
  return result.rows[0];
}

export async function updateTable(
  tableId: string,
  updates: Partial<Omit<AppTable, "id" | "workspace_id" | "created_at">>,
  db: pg.PoolClient
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
