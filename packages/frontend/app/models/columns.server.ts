import { PoolClient } from "pg";

export type AppColumn = {
  id: string;
  table_id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
};

export async function getColumns(tableId: string, db: PoolClient) {
  const result = await db.query<AppColumn>(
    `SELECT * FROM app_columns WHERE table_id = $1`,
    [tableId]
  );

  return result.rows;
}

export async function createColumn(
  tableId: string,
  data: Omit<AppColumn, "id" | "table_id" | "created_at" | "updated_at">,
  db: PoolClient
) {
  const result = await db.query<AppColumn>(
    `INSERT INTO app_columns(table_id, name, type, config) VALUES($1, $2, $3, $4) RETURNING *`,
    [tableId, data.name, data.type, data.config]
  );

  return result.rows[0];
}

export async function updateColumn(
  columnId: string,
  updates: Partial<Omit<AppColumn, "id" | "table_id" | "created_at">>,
  db: PoolClient
) {
  const setClause = Object.keys(updates)
    .map((key, i) => `${key} = $${i + 1}`)
    .join(", ");
  const values = Object.values(updates);

  const result = await db.query<AppColumn>(
    `UPDATE app_columns SET ${setClause} WHERE id = $${
      values.length + 1
    } RETURNING *`,
    [...values, columnId]
  );
  return result.rows[0];
}

export async function deleteColumn(columnId: string, db: PoolClient) {
  const result = await db.query<AppColumn>(
    `DELETE FROM app_columns WHERE id = $1 RETURNING *`,
    [columnId]
  );
  return result.rows[0];
}
