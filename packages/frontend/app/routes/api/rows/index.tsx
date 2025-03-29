import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createRow, getRows } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const url = new URL(request.url);
  const tableId = url.searchParams.get("tableId");

  if (!tableId) {
    throw new Response("Missing tableId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const rows = await getRows(tableId, db);
    return Response.json(rows);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const form = await request.formData();

  const tableId = form.get("tableId")?.toString();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  if (!tableId) {
    throw new Response("Missing tableId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const newRow = await createRow(tableId, data, userId, db);
    return Response.json(newRow);
  });
};
