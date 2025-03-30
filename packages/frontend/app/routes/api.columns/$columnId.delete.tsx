import { ActionFunction } from "@remix-run/node";
import { deleteColumn } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/columns/{columnId}:
 *   delete:
 *     summary: Delete a column
 *     description: Permanently deletes a column from a table
 *     tags:
 *       - Columns
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: ID of the column to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Column deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppColumn'
 *       400:
 *         description: Missing columnId parameter
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Column not found
 */

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const columnId = params.columnId;

  if (!columnId) {
    throw new Response("Missing columnId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const deleted = await deleteColumn(columnId, db);
    return Response.json(deleted);
  });
};
