import { ActionFunction } from "@remix-run/node";
import { deleteWorkspace, updateWorkspace } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";
import { ActionFunctionArgs } from "react-router";

/**
 * @swagger
 * /api/workspaces/{workspaceId}:
 *   patch:
 *     summary: Update a workspace
 *     tags:
 *       - Workspaces
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The workspace ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: Workspace update data
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: The updated workspace
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workspace'
 *       400:
 *         description: Missing workspaceId
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workspace not found or invalid data
 *
 *   delete:
 *     summary: Delete a workspace
 *     tags:
 *       - Workspaces
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The workspace ID to delete
 *     responses:
 *       200:
 *         description: The deleted workspace
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workspace'
 *       400:
 *         description: Missing workspaceId
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workspace not found
 */

const patchHandler = async ({ request, params }: ActionFunctionArgs) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const workspaceId = params.workspaceId;

  if (!workspaceId) {
    throw new Response("Missing workspaceId", { status: 400 });
  }

  const form = await request.formData();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const updated = await updateWorkspace(workspaceId, data, db);
    return Response.json(updated);
  });
};

const deleteHandler = async ({ request, params }: ActionFunctionArgs) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const workspaceId = params.workspaceId;

  if (!workspaceId) {
    throw new Response("Missing workspaceId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const deleted = await deleteWorkspace(workspaceId, db);
    return Response.json(deleted);
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  switch (request.method) {
    case "PATCH":
      return patchHandler({ request, params });
    case "DELETE":
      return deleteHandler({ request, params });
    default:
      throw new Response("Method not allowed", { status: 405 });
  }
};
