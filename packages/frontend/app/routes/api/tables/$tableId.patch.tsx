import { ActionFunction } from "@remix-run/node";
import { updateTable } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const tableId = params.tableId;

  if (!tableId) {
    throw new Response("Missing tableId", { status: 400 });
  }

  const form = await request.formData();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const updated = await updateTable(tableId, data, db);
    return Response.json(updated);
  });
};
