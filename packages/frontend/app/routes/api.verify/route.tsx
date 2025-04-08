import { ActionFunction } from "@remix-run/node";
import { getUsers } from "~/models";
import { getToken, updateToken } from "~/models/login.server";
import { query } from "~/utilities/db.server";
import { createUserSession } from "~/utilities/session.server";

/**
 * @swagger
 * /api/verify:
 *   post:
 *     summary: Verifies a login code and creates a user session
 *     description: Validates the provided verification code, updates the token status, and creates a user session if valid.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: The 6-digit verification code sent to the user's email
 *     responses:
 *       200:
 *         description: User authenticated successfully and session created
 *         headers:
 *           Set-Cookie:
 *             description: Session cookie for authenticated user
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid or expired code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const code = form.get("code")?.toString();

  if (!code) {
    throw new Response("Missing code", { status: 400 });
  }

  const token = await query(async (db) => {
    return await getToken(db, code);
  });

  if (!token) {
    return Response.json({ error: "Invalid or expired code", status: 400 });
  }

  query(async (db) => {
    await updateToken(db, token);
  });

  // Find or create user
  const user = await query(async (db) => {
    const usersResponse = await getUsers(db, {
      email: token.email,
      bypassRLSForLogin: true,
    });
    return usersResponse?.[0];
  });

  // Create session
  return createUserSession({
    request,
    userId: user.id,
    tenantId: user.tenant_id,
    roleId: user.role_id,
  });
};
