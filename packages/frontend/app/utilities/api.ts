export const BASE =
  typeof window === "undefined"
    ? (process.env.BACKEND_UPSTREAM ?? "http://localhost:5173")
    : "";

export async function getApiServer() {
  return BASE;
}

export const customFetch = async <
  T extends { data: any; status: number; headers: Headers },
>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const fullUrl = url.startsWith("/") ? `${BASE}${url}` : url;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as T;
};
