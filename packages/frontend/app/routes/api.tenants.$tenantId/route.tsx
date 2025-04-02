import { ActionFunction } from "@remix-run/node";
import { deleteTenant, updateTenant } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";
import { ActionFunctionArgs } from "react-router";

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
 *         description: Missing tenantId in URL or invalid/missing data in body
 *
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
 *               $ref: '#/components/schemas/Tenant' # Or potentially just a success message
 *       400:
 *         description: Missing tenantId in URL
 */

const patchHandler = async ({ request, params }: ActionFunctionArgs) => {
  const {
    userId,
    tenantId: sessionTenantId,
    roleId,
  } = await requireUserSession(request);
  const requestTenantId = params.tenantId;

  if (!requestTenantId) {
    throw new Response("Missing tenantId parameter in URL", { status: 400 });
  }

  const form = await request.formData();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  if (Object.keys(data).length === 0) {
    throw new Response("Missing or invalid data in request body", {
      status: 400,
    });
  }

  return queryWithContext(
    { userId, tenantId: sessionTenantId, roleId },
    async (db) => {
      const updated = await updateTenant(requestTenantId, data, db);
      return Response.json(updated);
    }
  );
};

const deleteHandler = async ({ request, params }: ActionFunctionArgs) => {
  const {
    userId,
    tenantId: sessionTenantId,
    roleId,
  } = await requireUserSession(request);
  const requestTenantId = params.tenantId;

  if (!requestTenantId) {
    throw new Response("Missing tenantId parameter in URL", { status: 400 });
  }

  return queryWithContext(
    { userId, tenantId: sessionTenantId, roleId },
    async (db) => {
      const deleted = await deleteTenant(requestTenantId, db);
      return Response.json(deleted);
    }
  );
};

export const action: ActionFunction = async (args) => {
  const { request, params } = args;

  switch (request.method) {
    case "PATCH":
      return patchHandler(args);
    case "DELETE":
      return deleteHandler(args);
    default:
      throw new Response("Method not allowed", { status: 405 });
  }
};
