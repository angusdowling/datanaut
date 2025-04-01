import pg from "pg";

/**
 * @swagger
 * components:
 *   schemas:
 *     Tenant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The tenant ID
 *         name:
 *           type: string
 *           description: The tenant name
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

export type Tenant = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export async function createTenant(
  data: Omit<Tenant, "created_at" | "updated_at">,
  db: pg.PoolClient
) {
  const result = await db.query<Tenant>(
    `INSERT INTO tenants(name) VALUES($1) RETURNING *`,
    [data.name]
  );
  return result.rows[0];
}

export async function deleteTenant(tenantId: string, db: pg.PoolClient) {
  const result = await db.query<Tenant>(
    `DELETE FROM tenants WHERE id = $1 RETURNING *`,
    [tenantId]
  );
  if (result.rowCount === 0) {
    throw new Error("Tenant not found");
  }
  return result.rows[0];
}

export async function updateTenant(
  id: string,
  data: Partial<Omit<Tenant, "id" | "created_at" | "updated_at">>,
  db: pg.PoolClient
) {
  const updateFields = Object.entries(data)
    .map(([key, _], index) => `${key} = $${index + 2}`)
    .join(", ");

  const values = [id, ...Object.values(data)];
  const result = await db.query<Tenant>(
    `UPDATE tenants SET ${updateFields} WHERE id = $1 RETURNING *`,
    values
  );

  if (result.rowCount === 0) {
    throw new Error("Tenant not found");
  }

  return result.rows[0];
}

export async function getTenant(
  db: pg.PoolClient,
  options?: {
    id?: string;
    userId?: string;
  }
): Promise<Tenant | Tenant[] | null> {
  if (!options) {
    const result = await db.query<Tenant>(`SELECT * FROM tenants`);
    return result.rows;
  }

  const { id, userId } = options;

  if (id) {
    const result = await db.query<Tenant>(
      `SELECT * FROM tenants WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  if (userId) {
    const result = await db.query<Tenant>(
      `SELECT t.* FROM tenants t JOIN users u ON t.id = u.tenant_id WHERE u.id = $1`,
      [userId]
    );
    return result.rows[0] || null;
  }

  const result = await db.query<Tenant>(`SELECT * FROM tenants`);
  return result.rows;
}
