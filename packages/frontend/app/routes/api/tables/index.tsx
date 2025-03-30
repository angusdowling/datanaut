import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createTable, getTables } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Get all tables for a workspace
 *     tags:
 *       - Tables
 *     parameters:
 *       - in: query
 *         name: workspaceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppTable'
 *       400:
 *         description: Missing workspaceId
 *   post:
 *     summary: Create a new table
 *     tags:
 *       - Tables
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               workspaceId:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - workspaceId
 *               - name
 *     responses:
 *       200:
 *         description: The created table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppTable'
 *       400:
 *         description: Missing workspaceId or table name
 */

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get("workspaceId");

  if (!workspaceId) {
    throw new Response("Missing workspaceId", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const tables = await getTables(workspaceId, db);
    return Response.json(tables);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const form = await request.formData();

  const workspaceId = form.get("workspaceId")?.toString();
  const name = form.get("name")?.toString();

  if (!workspaceId) {
    throw new Response("Missing workspaceId", { status: 400 });
  }

  if (!name) {
    throw new Response("Missing table name", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const newTable = await createTable(workspaceId, name, db);
    return Response.json(newTable);
  });
};
