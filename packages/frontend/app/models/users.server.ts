import pg from "pg";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         tenant_id:
 *           type: string
 *           description: The tenant this user belongs to
 *         email:
 *           type: string
 *           description: The user's email
 *         name:
 *           type: string
 *           description: The user's name
 *         password_hash:
 *           type: string
 *           description: Hashed password
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - tenant_id
 *         - email
 *         - name
 *         - password_hash
 *         - created_at
 *         - updated_at
 */

export type User = {
  id: string;
  tenant_id: string;
  role_id: string;
  email: string;
  name: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
};

export async function createUser(
  tenantId: string,
  userData: Omit<User, "id" | "tenant_id" | "created_at" | "updated_at">,
  db: pg.PoolClient
) {
  const result = await db.query<User>(
    `INSERT INTO users(tenant_id, email, name, password_hash) VALUES($1, $2, $3, $4) RETURNING *`,
    [tenantId, userData.email, userData.name, userData.password_hash]
  );
  return result.rows[0];
}

export async function getUsers(
  db: pg.PoolClient,
  options?: {
    tenantId?: string | null;
    email?: string | null;
    bypassRLSForLogin?: boolean;
  }
): Promise<User[]> {
  const { tenantId, email, bypassRLSForLogin = false } = options ?? {};

  if (bypassRLSForLogin) {
    await db.query(
      `SET LOCAL app.current_user_permissions TO '["platform_admin"]'`
    );
  }

  let query = `SELECT * FROM users`;
  const conditions: string[] = [];
  const values: any[] = [];

  if (tenantId != null && tenantId !== "") {
    conditions.push(`tenant_id = $${values.length + 1}`);
    values.push(tenantId);
  }

  if (email != null && email !== "") {
    conditions.push(`email = $${values.length + 1}`);
    values.push(email);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  const result = await db.query<User>(query, values);
  return result.rows;
}

export async function deleteUser(id: string, db: pg.PoolClient) {
  await db.query(`DELETE FROM users WHERE id = $1`, [id]);
}

export async function updateUser(
  id: string,
  data: Partial<Omit<User, "id" | "tenant_id" | "created_at" | "updated_at">>,
  db: pg.PoolClient
) {
  const updateFields = Object.entries(data)
    .map(([key, _], index) => `${key} = $${index + 2}`)
    .join(", ");

  const values = [id, ...Object.values(data)];
  const result = await db.query<User>(
    `UPDATE users SET ${updateFields} WHERE id = $1 RETURNING *`,
    values
  );

  return result.rows[0];
}
