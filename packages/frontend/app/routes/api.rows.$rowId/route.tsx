import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { deleteRow, updateRow } from "~/models";
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

const deleteHandler = async ({ request, params }: ActionFunctionArgs) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const rowId = params.rowId;

  if (!rowId) {
    throw new Response("Missing rowId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const deleted = await deleteRow(rowId, db);
    return Response.json(deleted);
  });
};

const patchHandler = async ({ request, params }: ActionFunctionArgs) => {
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

export const action: ActionFunction = async (args) => {
  const { request, params } = args;

  switch (request.method) {
    case "PATCH":
      return patchHandler(args);
    case "DELETE":
      return deleteHandler(args);
    default:
      throw new Response("Method not allowed", { status: 405 });
  }
};
