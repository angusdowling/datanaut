import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createUser, getUsers } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     description: Returns a list of users, optionally filtered by tenantId or email
 *     parameters:
 *       - in: query
 *         name: tenantId
 *         schema:
 *           type: string
 *         description: Optional tenant ID to filter users
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Optional email to filter users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: User data including email, name and password_hash
 *               tenantId:
 *                 type: string
 *             required:
 *               - data
 *               - tenantId
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing required fields
 */

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);

  const url = new URL(request.url);
  const requestTenantId = url.searchParams.get("tenantId");
  const requestEmail = url.searchParams.get("email");

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const users = await getUsers(db, {
      email: requestEmail,
      tenantId: requestTenantId,
    });
    return Response.json(users);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);
  const form = await request.formData();

  const data = JSON.parse(form.get("data")?.toString() || "{}");
  const queryTenantId = form.get("tenantId")?.toString();

  if (!queryTenantId) {
    throw new Response("Missing tenantId", { status: 400 });
  }

  if (!data) {
    throw new Response("Missing data", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const newUser = await createUser(queryTenantId, data, db);
    return Response.json(newUser);
  });
};
