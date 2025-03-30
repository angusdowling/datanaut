import { PoolClient } from "pg";

/**
 * @swagger
 * components:
 *   schemas:
 *     Workspace:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The workspace ID
 *         name:
 *           type: string
 *           description: The workspace name
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - name
 *         - created_at
 *         - updated_at
 */

export type Workspace = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export async function getWorkspaces(db: PoolClient, tenantId?: string | null) {
  let query = `SELECT * FROM users`;
  const conditions: string[] = [];
  const values: any[] = [];

  if (tenantId != null && tenantId !== "") {
    conditions.push(`id = $${values.length + 1}`);
    values.push(tenantId);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  const result = await db.query<Workspace>(query, values);
  return result.rows;
}

export async function createWorkspace(
  tenantId: string,
  name: string,
  db: PoolClient
) {
  const result = await db.query<Workspace>(
    `INSERT INTO workspaces(id, name) VALUES($1, $2) RETURNING *`,
    [tenantId, name]
  );
  return result.rows[0];
}

export async function deleteWorkspace(workspaceId: string, db: PoolClient) {
  const result = await db.query<Workspace>(
    `DELETE FROM workspaces WHERE id = $1 RETURNING *`,
    [workspaceId]
  );
  return result.rows[0];
}

export async function updateWorkspace(
  workspaceId: string,
  updates: Partial<Omit<Workspace, "id" | "created_at">>,
  db: PoolClient
) {
  const setClause = Object.keys(updates)
    .map((key, i) => `${key} = $${i + 1}`)
    .join(", ");
  const values = Object.values(updates);

  const result = await db.query<Workspace>(
    `UPDATE workspaces SET ${setClause} WHERE id = $${
      values.length + 1
    } RETURNING *`,
    [...values, workspaceId]
  );
  return result.rows[0];
}
