import { PoolClient } from "pg";

export type Tenant = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export async function createTenant(
  data: Omit<Tenant, "created_at" | "updated_at">,
  db: PoolClient
) {
  const result = await db.query<Tenant>(
    `INSERT INTO tenants(name) VALUES($1) RETURNING *`,
    [data.name]
  );
  return result.rows[0];
}

export async function deleteTenant(tenantId: string, db: PoolClient) {
  const result = await db.query<Tenant>(
    `DELETE FROM tenants WHERE id = $1 RETURNING *`,
    [tenantId]
  );
  if (result.rowCount === 0) {
    throw new Error("Tenant not found");
  }
  return result.rows[0];
}

export async function getTenantById(id: string, db: PoolClient) {
  const result = await db.query<Tenant>(`SELECT * FROM tenants WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function getTenantByUserId(userId: string, db: PoolClient) {
  const result = await db.query<Tenant>(
    `SELECT t.* FROM tenants t JOIN users u ON t.id = u.tenant_id WHERE u.id = $1`,
    [userId]
  );

  return result.rows[0];
}

export async function getTenants(db: PoolClient) {
  const result = await db.query<Tenant>(`SELECT * FROM tenants`);
  return result.rows;
}
