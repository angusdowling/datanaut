import { ActionFunction } from "@remix-run/node";
import { deleteUser, updateUser } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";
import { ActionFunctionArgs } from "react-router";

/**
 * @swagger
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

const patchHandler = async ({ request, params }: ActionFunctionArgs) => {
  const {
    userId: sessionUserId,
    tenantId,
    roleId,
  } = await requireUserSession(request);
  const requestUserId = params.userId;

  if (!requestUserId) {
    throw new Response("Missing userId parameter in URL", { status: 400 });
  }

  const form = await request.formData();
  const data = JSON.parse(form.get("data")?.toString() || "{}");

  if (Object.keys(data).length === 0) {
    throw new Response("Missing or invalid data in request body", {
      status: 400,
    });
  }

  return queryWithContext(
    { userId: sessionUserId, tenantId, roleId },
    async (db) => {
      const updated = await updateUser(requestUserId, data, db);
      return Response.json(updated);
    }
  );
};

const deleteHandler = async ({ request, params }: ActionFunctionArgs) => {
  const {
    userId: sessionUserId,
    tenantId,
    roleId,
  } = await requireUserSession(request);
  const requestUserId = params.userId; // Get userId from URL path parameters

  if (!requestUserId) {
    throw new Response("Missing userId parameter in URL", { status: 400 });
  }

  return queryWithContext(
    { userId: sessionUserId, tenantId, roleId },
    async (db) => {
      const deleted = await deleteUser(requestUserId, db);
      return Response.json(deleted);
    }
  );
};

export const action: ActionFunction = async (args) => {
  const { request, params } = args;

  if (!params.userId) {
    throw new Response("Method requires a userId in the URL.", {
      status: 400,
    });
  }

  switch (request.method) {
    case "PATCH":
      return patchHandler(args);
    case "DELETE":
      return deleteHandler(args);
    default:
      throw new Response("Method not allowed", { status: 405 });
  }
};
