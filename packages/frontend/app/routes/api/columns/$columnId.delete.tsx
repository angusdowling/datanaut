import { ActionFunction } from "@remix-run/node";
import { deleteColumn } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const columnId = params.columnId;

  if (!columnId) {
    throw new Response("Missing columnId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const deleted = await deleteColumn(columnId, db);
    return Response.json(deleted);
  });
};
