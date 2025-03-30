import { ActionFunction } from "@remix-run/node";
import { getUsers } from "~/models";
import { getToken, updateToken } from "~/models/login.server";
import { query } from "~/utilities/db.server";
import { createUserSession } from "~/utilities/session.server";

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
    throw new Response("Invalid or expired code", { status: 400 });
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
    // redirectTo: "http://localhost:5173/",
  });
};
