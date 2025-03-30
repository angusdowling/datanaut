import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createColumn, getColumns } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/columns:
 *   get:
 *     summary: Get all columns for a table
 *     tags:
 *       - Columns
 *     parameters:
 *       - in: query
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of columns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppColumn'
 *       400:
 *         description: Missing tableId
 *   post:
 *     summary: Create a new column
 *     tags:
 *       - Columns
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               tableId:
 *                 type: string
 *               data:
 *                 type: object
 *             required:
 *               - tableId
 *               - data
 *     responses:
 *       200:
 *         description: The created column
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppColumn'
 *       400:
 *         description: Missing tableId or data
 */

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const url = new URL(request.url);
  const tableId = url.searchParams.get("tableId");

  if (!tableId) {
    throw new Response("Missing tableId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const columns = await getColumns(tableId, db);
    return Response.json(columns);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const form = await request.formData();

  const tableId = form.get("tableId")?.toString();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  if (!tableId) {
    throw new Response("Missing tableId", { status: 400 });
  }

  if (!data) {
    throw new Response("Missing data", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const newColumn = await createColumn(tableId, data, db);
    return Response.json(newColumn);
  });
};
