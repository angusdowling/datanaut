import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createTable, getTables } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get("workspaceId");

  if (!workspaceId) {
    throw new Response("Missing workspaceId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const tables = await getTables(workspaceId, db);
    return Response.json(tables);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const form = await request.formData();

  const workspaceId = form.get("workspaceId")?.toString();
  const name = form.get("name")?.toString();

  if (!workspaceId) {
    throw new Response("Missing workspaceId", { status: 400 });
  }

  if (!name) {
    throw new Response("Missing table name", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const newTable = await createTable(workspaceId, name, db);
    return Response.json(newTable);
  });
};
