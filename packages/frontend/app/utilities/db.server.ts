import { Pool, PoolClient } from "pg";
import { UserRole } from "~/models";

const pool = new Pool({
  // Configure your PostgreSQL connection here
});

export async function queryWithContext<T>(
  context: {
    role: UserRole;
    tenantId?: string;
    userId?: string;
  },
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    if (context.role) {
      await client.query(
        `select set_config('app.current_user_role', $1, true)`,
        [context.role]
      );
    }
    if (context.tenantId) {
      await client.query(
        `select set_config('app.current_tenant_id', $1, true)`,
        [context.tenantId]
      );
    }
    if (context.userId) {
      await client.query(`select set_config('app.current_user_id', $1, true)`, [
        context.userId,
      ]);
    }

    return await fn(client);
  } finally {
    client.release();
  }
}
