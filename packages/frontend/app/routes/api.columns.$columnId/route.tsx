import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { deleteColumn, updateColumn } from "~/models";
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
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: Column update data
 *             required:
 *               - data
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

const patchHandler = async ({ request, params }: ActionFunctionArgs) => {
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

const deleteHandler = async ({ request, params }: ActionFunctionArgs) => {
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
