import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createUser, getUsers } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);

  const url = new URL(request.url);
  const requestTenantId = url.searchParams.get("tenantId");
  const requestEmail = url.searchParams.get("email");

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const users = await getUsers(db, requestTenantId, requestEmail);
    return Response.json(users);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const form = await request.formData();

  const data = JSON.parse(form.get("data")?.toString() || "{}");
  const queryTenantId = form.get("tenantId")?.toString();

  if (!queryTenantId) {
    throw new Response("Missing tenantId", { status: 400 });
  }

  if (!data) {
    throw new Response("Missing data", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const newUser = await createUser(queryTenantId, data, db);
    return Response.json(newUser);
  });
};
