import { ActionFunction } from "@remix-run/node";
import { updateColumn } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/columns/{columnId}:
 *   patch:
 *     summary: Update a column
 *     description: Updates properties of an existing column
 *     tags:
 *       - Columns
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: ID of the column to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppColumn'
 *     responses:
 *       200:
 *         description: Column updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppColumn'
 *       400:
 *         description: Missing columnId or invalid request body
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

  const form = await request.formData();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const updated = await updateColumn(columnId, data, db);
    return Response.json(updated);
  });
};
