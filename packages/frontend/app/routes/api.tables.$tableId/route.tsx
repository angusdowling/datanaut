import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { deleteTable, updateTable } from "~/models";
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

const deleteHandler = async ({ request, params }: ActionFunctionArgs) => {
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

const patchHandler = async ({ request, params }: ActionFunctionArgs) => {
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
