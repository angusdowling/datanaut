import { ActionFunction } from "@remix-run/node";
import { deleteWorkspace } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/workspaces/{workspaceId}:
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
 */

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
