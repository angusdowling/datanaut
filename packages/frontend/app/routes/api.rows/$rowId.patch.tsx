import { ActionFunction } from "@remix-run/node";
import { updateRow } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/rows/{rowId}:
 *   patch:
 *     summary: Update a row
 *     description: Updates properties of an existing row
 *     tags:
 *       - Rows
 *     parameters:
 *       - in: path
 *         name: rowId
 *         required: true
 *         description: ID of the row to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppRow'
 *     responses:
 *       200:
 *         description: Row updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppRow'
 *       400:
 *         description: Missing rowId or invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Row not found
 */

export const action: ActionFunction = async ({ request, params }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const rowId = params.rowId;

  if (!rowId) {
    throw new Response("Missing rowId", { status: 400 });
  }

  const form = await request.formData();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const updated = await updateRow(rowId, data, db);
    return Response.json(updated);
  });
};
