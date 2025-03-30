import { ActionFunction } from "@remix-run/node";
import { deleteTable } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/tables/{tableId}:
 *   delete:
 *     summary: Delete a table
 *     description: Permanently deletes a table and all its associated data
 *     tags:
 *       - Tables
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         description: ID of the table to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Table deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppTable'
 *       400:
 *         description: Missing tableId parameter
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Table not found
 */

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const tableId = params.tableId;

  if (!tableId) {
    throw new Response("Missing tableId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const deleted = await deleteTable(tableId, db);
    return Response.json(deleted);
  });
};
