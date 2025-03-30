import { ActionFunction } from "@remix-run/node";
import { deleteRow } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/rows/{rowId}:
 *   delete:
 *     summary: Delete a row
 *     description: Permanently deletes a row from a table
 *     tags:
 *       - Rows
 *     parameters:
 *       - in: path
 *         name: rowId
 *         required: true
 *         description: ID of the row to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Row deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppRow'
 *       400:
 *         description: Missing rowId parameter
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Row not found
 */

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const rowId = params.rowId;

  if (!rowId) {
    throw new Response("Missing rowId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const deleted = await deleteRow(rowId, db);
    return Response.json(deleted);
  });
};
