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
 *
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
 *
 * /api/users/{userId}:
 *   patch:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: User update data
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing userId or invalid data
 *
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to delete
 *     responses:
 *       200:
 *         description: The deleted user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing userId
 */

export const action: ActionFunction = async ({ request }) => {
  // params not needed for POST /api/users
  const {
    userId: sessionUserId,
    tenantId,
    roleId,
  } = await requireUserSession(request);
  const form = await request.formData();

  const data = JSON.parse(form.get("data")?.toString() || "{}");
  const queryTenantId = form.get("tenantId")?.toString();

  if (!queryTenantId) {
    throw new Response("Missing tenantId in request body", { status: 400 });
  }

  if (Object.keys(data).length === 0 || !data.email || !data.name) {
    throw new Response("Missing required fields in data object (email, name)", {
      status: 400,
    });
  }

  return queryWithContext(
    { userId: sessionUserId, tenantId, roleId },
    async (db) => {
      const newUser = await createUser(queryTenantId, data, db);
      return Response.json(newUser);
    }
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, roleId } = await requireUserSession(request);

  const url = new URL(request.url);
  const requestTenantId = url.searchParams.get("tenantId");
  const requestEmail = url.searchParams.get("email");

  return queryWithContext({ userId, tenantId, roleId }, async (db) => {
    const users = await getUsers(db, {
      email: requestEmail || undefined,
      tenantId: requestTenantId || undefined,
    });
    return Response.json(users);
  });
};
