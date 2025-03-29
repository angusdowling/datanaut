import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createWorkspace, getUsers, getWorkspaces } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);

  const url = new URL(request.url);
  const requestTenantId = url.searchParams.get("tenantId");

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const workspaces = await getWorkspaces(db, requestTenantId);
    return Response.json(workspaces);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const form = await request.formData();

  const name = form.get("name")?.toString();
  const queryTenantId = form.get("tenantId")?.toString();

  if (!queryTenantId) {
    throw new Response("Missing tenantId", { status: 400 });
  }

  if (!name) {
    throw new Response("Missing name", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const newWorkspace = await createWorkspace(queryTenantId, name, db);
    return Response.json(newWorkspace);
  });
};
