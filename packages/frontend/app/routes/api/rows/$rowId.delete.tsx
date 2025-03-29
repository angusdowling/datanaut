import { ActionFunction } from "@remix-run/node";
import { deleteRow } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const rowId = params.rowId;

  if (!rowId) {
    throw new Response("Missing rowId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const deleted = await deleteRow(rowId, db);
    return Response.json(deleted);
  });
};
