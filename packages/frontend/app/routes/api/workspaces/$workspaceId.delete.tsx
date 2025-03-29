import { ActionFunction } from "@remix-run/node";
import { deleteWorkspace } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const workspaceId = params.workspaceId;

  if (!workspaceId) {
    throw new Response("Missing workspaceId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const deleted = await deleteWorkspace(workspaceId, db);
    return Response.json(deleted);
  });
};
