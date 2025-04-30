import { redirect } from "@remix-run/node";
import { postAuthRefresh } from "~/services/api/auth/auth";

export async function requireAuth(request: Request) {
  try {
    const cookie = request.headers.get("Cookie");
    // Try to refresh the token
    return await postAuthRefresh({
      headers: {
        Cookie: cookie ?? "",
      },
    });
  } catch (error) {
    // If refresh fails, redirect to login
    throw redirect("/login");
  }
}

// Helper to check if a route is public
export function isPublicRoute(pathname: string) {
  const publicRoutes = ["/login", "/register", "/verify"];
  return publicRoutes.some((route) => pathname.includes(route));
}
