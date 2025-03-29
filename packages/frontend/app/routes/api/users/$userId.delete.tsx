import { ActionFunction } from "@remix-run/node";
import { deleteUser } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const requestUserId = params.userId;

  if (!requestUserId) {
    throw new Response("Missing userId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const deleted = await deleteUser(requestUserId, db);
    return Response.json(deleted);
  });
};
