import { ActionFunction } from "@remix-run/node";
import { deleteTenant } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/tenants/{tenantId}:
 *   delete:
 *     summary: Delete a tenant
 *     tags:
 *       - Tenants
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tenant ID to delete
 *     responses:
 *       200:
 *         description: The deleted tenant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tenant'
 *       400:
 *         description: Missing tenantId
 */

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const requestTenantId = params.tenantId;

  if (!requestTenantId) {
    throw new Response("Missing requestTenantId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const deleted = await deleteTenant(requestTenantId, db);
    return Response.json(deleted);
  });
};
