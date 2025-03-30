import { ActionFunction } from "@remix-run/node";
import { updateWorkspace } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

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
 *         description: Missing workspaceId or invalid data
 */

export const action: ActionFunction = async ({ request, params }) => {
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
