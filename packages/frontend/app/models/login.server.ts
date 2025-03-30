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
export type LoginToken = {
  id: string;
  email: string;
  code: string;
  expires_at: string;
  used: boolean;
  created_at: string;
};

/**
 * Get a login token
 * @param db - Database client
 * @param email - The email of the user
 * @param code - The login token
 * @returns The login token
 */
export async function getToken(db: pg.PoolClient, token: string) {
  const result = await db.query<LoginToken>(
    `SELECT * FROM login_tokens WHERE code = $1 AND used = false AND expires_at > NOW()`,
    [token]
  );
  return result.rows[0];
}

/**
 * Create token
 * @param db - Database client
 * @param email - The email of the user
 * @param code - The login token
 */
export async function createToken(
  db: pg.PoolClient,
  email: string,
  token: string,
  expiresAt: Date
) {
  await db.query<LoginToken>(
    `INSERT INTO login_tokens (email, code, expires_at) VALUES ($1, $2, $3)`,
    [email, token, expiresAt]
  );
}

/**
 * Update token
 * @param db - Database client
 * @param email - The email of the user
 * @param code - The login token
 */
export async function updateToken(db: pg.PoolClient, token: LoginToken) {
  await db.query<LoginToken>(
    `UPDATE login_tokens SET used = true WHERE id = $1`,
    [token.id]
  );
}
