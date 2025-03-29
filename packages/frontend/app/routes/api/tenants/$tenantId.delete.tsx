import { ActionFunction } from "@remix-run/node";
import { deleteTenant } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const requestTenantId = params.tenantId;

  if (!requestTenantId) {
    throw new Response("Missing requestTenantId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const deleted = await deleteTenant(requestTenantId, db);
    return Response.json(deleted);
  });
};
