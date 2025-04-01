import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createWorkspace, getWorkspaces } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/workspaces:
 *   get:
 *     summary: Get all workspaces
 *     tags:
 *       - Workspaces
 *     description: Returns a list of workspaces, optionally filtered by tenantId
 *     parameters:
 *       - in: query
 *         name: tenantId
 *         schema:
 *           type: string
 *         description: Optional tenant ID to filter workspaces
 *     responses:
 *       200:
 *         description: A list of workspaces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workspace'
 *
 *   post:
 *     summary: Create a new workspace
 *     tags:
 *       - Workspaces
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               tenantId:
 *                 type: string
 *             required:
 *               - name
 *               - tenantId
 *     responses:
 *       200:
 *         description: The created workspace
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workspace'
 *       400:
 *         description: Missing required fields
 */

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const form = await request.formData();

  const name = form.get("name")?.toString();
  const queryTenantId = form.get("tenantId")?.toString();

  if (!queryTenantId) {
    throw new Response("Missing tenantId", { status: 400 });
  }

  if (!name) {
    throw new Response("Missing name", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const newWorkspace = await createWorkspace(queryTenantId, name, db);
    return Response.json(newWorkspace);
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);

  const url = new URL(request.url);
  const requestTenantId = url.searchParams.get("tenantId");

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const workspaces = await getWorkspaces(db, requestTenantId);
    return Response.json(workspaces);
  });
};
