import pg from "pg";

const pool = new pg.Pool({
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT || "5432"),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

if (
  !process.env.PG_USER ||
  !process.env.PG_PASSWORD ||
  !process.env.PG_DATABASE
) {
  throw new Error("Missing required PostgreSQL environment variables");
}

export async function query<T>(
  fn: (client: pg.PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}

export async function queryWithContext<T>(
  context: {
    roleId?: string;
    tenantId?: string;
    userId?: string;
  },
  fn: (client: pg.PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    if (context.roleId) {
      await client.query(
        `select set_config('app.current_user_permissions', $1, true)`,
        [context.roleId]
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
