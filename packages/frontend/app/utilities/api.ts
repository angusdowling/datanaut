import { postAuthRefresh } from "~/services/api/auth/auth";

export const BASE =
  typeof window === "undefined"
    ? (process.env.BACKEND_UPSTREAM ?? "http://localhost:5173")
    : "";

export async function getApiServer() {
  return BASE;
}

interface CustomFetchOptions extends RequestInit {
  skipRefresh?: boolean;
}

export const customFetch = async <
  T extends { data: any; status: number; headers: Headers },
>(
  url: string,
  options?: CustomFetchOptions
): Promise<T> => {
  const fullUrl = url.startsWith("/") ? `${BASE}${url}` : url;
  const { skipRefresh, ...fetchOptions } = options || {};

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add any custom headers
  if (fetchOptions.headers) {
    Object.assign(headers, fetchOptions.headers);
  }

  const res = await fetch(fullUrl, {
    ...fetchOptions,
    headers,
    credentials: "include", // Always include cookies
  });

  // Handle 401 by attempting to refresh token, but skip refresh for the refresh request itself
  if (res.status === 401 && !skipRefresh) {
    try {
      // Attempt to refresh the token
      const refreshRes = await fetch(`${BASE}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        throw new Error("Token refresh failed");
      }

      // Retry the request once after refresh
      const retryRes = await fetch(fullUrl, {
        ...fetchOptions,
        headers,
        credentials: "include",
      });
      const body = [204, 205, 304].includes(retryRes.status)
        ? null
        : await retryRes.text();
      const data = body ? JSON.parse(body) : {};
      return {
        data,
        status: retryRes.status,
        headers: retryRes.headers,
      } as T;
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  }

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as T;
};
