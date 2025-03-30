import { ActionFunction } from "@remix-run/node";
import { updateTable } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/tenants/{tenantId}:
 *   patch:
 *     summary: Update a tenant
 *     tags:
 *       - Tenants
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tenant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: Tenant update data
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: The updated tenant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tenant'
 *       400:
 *         description: Missing tenantId or invalid data
 */

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const tableId = params.tableId;

  if (!tableId) {
    throw new Response("Missing tableId", { status: 400 });
  }

  const form = await request.formData();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const updated = await updateTable(tableId, data, db);
    return Response.json(updated);
  });
};
