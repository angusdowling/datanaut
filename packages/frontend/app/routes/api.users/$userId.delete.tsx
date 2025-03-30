import { ActionFunction } from "@remix-run/node";
import { deleteUser } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to delete
 *     responses:
 *       200:
 *         description: The deleted user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing userId
 */

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const requestUserId = params.userId;

  if (!requestUserId) {
    throw new Response("Missing userId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const deleted = await deleteUser(requestUserId, db);
    return Response.json(deleted);
  });
};
