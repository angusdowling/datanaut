import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createTenant, getTenant } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/tenants:
 *   get:
 *     summary: Get all tenants
 *     tags:
 *       - Tenants
 *     description: Returns a list of all tenants accessible to the user.
 *     responses:
 *       200:
 *         description: A list of tenants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tenant'
 *
 *   post:
 *     summary: Create a new tenant
 *     tags:
 *       - Tenants
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: Tenant data including name
 *                 properties:
 *                   name:
 *                     type: string
 *                 required:
 *                   - name
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: The created tenant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tenant'
 *       400:
 *         description: Missing required fields (e.g., data or data.name)
 */

export const action: ActionFunction = async ({ request }) => {
  const {
    userId,
    tenantId: sessionTenantId,
    roleId,
  } = await requireUserSession(request);
  const form = await request.formData();

  const data = JSON.parse(form.get("data")?.toString() || "{}");

  if (Object.keys(data).length === 0 || !data.name) {
    throw new Response("Missing required fields in data object (e.g., name)", {
      status: 400,
    });
  }

  return queryWithContext(
    { userId, tenantId: sessionTenantId, roleId },
    async (db) => {
      const newTenant = await createTenant(data, db);
      return Response.json(newTenant);
    }
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const tenants = await getTenant(db);
    return Response.json(tenants);
  });
};
