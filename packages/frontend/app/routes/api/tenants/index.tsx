import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createTenant, getTenants } from "~/models";
import { queryWithContext } from "~/utilities/db.server";
import { requireUserSession } from "~/utilities/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const tables = await getTenants(db);
    return Response.json(tables);
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { userId, tenantId, role } = await requireUserSession(request);
  const form = await request.formData();

  const data = JSON.parse(form.get("data")?.toString() || "{}");

  if (!data) {
    throw new Response("Missing data", { status: 400 });
  }

  return queryWithContext({ userId, tenantId, role }, async (db) => {
    const newTenant = await createTenant(data, db);
    return Response.json(newTenant);
  });
};
