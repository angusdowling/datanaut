import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { requireAuth, isPublicRoute } from "./utilities/auth";
import globalStylesUrl from "./styles/global.scss?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStylesUrl },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // Only check auth for protected routes
  if (!isPublicRoute(url.pathname)) {
    const response = await requireAuth(request);

    const loaderResponse = new Response();
    const setCookie = response.headers.get("set-cookie");

    if (setCookie) {
      loaderResponse.headers.set("set-cookie", setCookie);
    }

    return loaderResponse;
  }

  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function MyApp() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
            retry: (failureCount, error) => {
              // Don't retry on 401 errors - we'll handle those with token refresh
              if (error instanceof Error && error.message.includes("401")) {
                return false;
              }
              return failureCount < 3;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
