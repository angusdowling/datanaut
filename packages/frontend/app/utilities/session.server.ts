import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { UserRole } from "~/models";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

type CreateUserSessionArgs = {
  request: Request;
  userId: string;
  role: string;
  tenantId: string;
  redirectTo: string;
};

export async function createUserSession({
  request,
  userId,
  role,
  tenantId,
  redirectTo,
}: CreateUserSessionArgs) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  session.set("role", role);
  session.set("tenantId", tenantId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

type UserSession = {
  userId: string;
  role: UserRole;
  tenantId: string;
};

export async function requireUserSession(
  request: Request
): Promise<UserSession> {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  if (!userId) throw new Response("Unauthorized", { status: 401 });

  return {
    userId,
    role: session.get("role"),
    tenantId: session.get("tenantId"),
  };
}
