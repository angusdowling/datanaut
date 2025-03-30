import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createTenant, getTenants } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/tenants:
 *   get:
 *     summary: Get all tenants
 *     tags:
 *       - Tenants
 *     responses:
 *       200:
 *         description: A list of tenants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tenant'
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
 *         description: Missing required fields
 */

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const tables = await getTenants(db);
    return Response.json(tables);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const form = await request.formData();

  const data = JSON.parse(form.get("data")?.toString() || "{}");

  if (!data) {
    throw new Response("Missing data", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const newTenant = await createTenant(data, db);
    return Response.json(newTenant);
  });
};
