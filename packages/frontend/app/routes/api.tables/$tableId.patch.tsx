import { ActionFunction } from "@remix-run/node";
import { updateTable } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/tables/{tableId}:
 *   patch:
 *     summary: Update a table
 *     description: Updates properties of an existing table
 *     tags:
 *       - Tables
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         description: ID of the table to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppTable'
 *     responses:
 *       200:
 *         description: Table updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppTable'
 *       400:
 *         description: Missing tableId or invalid request body
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

  const form = await request.formData();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const updated = await updateTable(tableId, data, db);
    return Response.json(updated);
  });
};
