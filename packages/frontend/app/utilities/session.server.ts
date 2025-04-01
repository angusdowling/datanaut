import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

type CreateUserSessionArgs = {
  request: Request;
  userId: string;
  roleId: string;
  tenantId: string;
};

export async function createUserSession({
  request,
  userId,
  roleId,
  tenantId,
}: CreateUserSessionArgs) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  session.set("roleId", roleId);
  session.set("tenantId", tenantId);

  return new Response("", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

type UserSession = {
  userId: string;
  roleId: string;
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
    roleId: session.get("roleId"),
    tenantId: session.get("tenantId"),
  };
}
