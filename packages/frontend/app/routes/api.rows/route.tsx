import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createRow, getRows } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/rows:
 *   get:
 *     summary: Get all rows for a table
 *     tags:
 *       - Rows
 *     parameters:
 *       - in: query
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of rows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppRow'
 *       400:
 *         description: Missing tableId
 *   post:
 *     summary: Create a new row
 *     tags:
 *       - Rows
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
 *         description: The created row
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppRow'
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
    const rows = await getRows(tableId, db);
    return Response.json(rows);
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

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const newRow = await createRow(tableId, data, userId, db);
    return Response.json(newRow);
  });
};
