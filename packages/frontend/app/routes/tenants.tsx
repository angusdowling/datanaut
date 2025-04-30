import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { TenantsTable } from "~/features/tenants/TenantsTable";
import { prefetchGetTenants } from "~/services/api/tenants/tenants";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie");
  const queryClient = new QueryClient();

  await prefetchGetTenants(queryClient, {
    request: {
      headers: {
        Cookie: cookie ?? "",
      },
    },
  });

  return Response.json({ dehydratedState: dehydrate(queryClient) });
}

export default function TenantsRoute() {
  const { dehydratedState } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <TenantsTable />
    </HydrationBoundary>
  );
}
