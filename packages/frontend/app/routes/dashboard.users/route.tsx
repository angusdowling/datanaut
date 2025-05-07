import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { UsersTable } from "~/features/users/UsersTable";
import { prefetchGetUsers } from "~/services/api/users/users";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut - Users" },
    { name: "description", content: "Manage your users" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie");
  const queryClient = new QueryClient();

  await prefetchGetUsers(queryClient, {
    request: {
      headers: {
        Cookie: cookie ?? "",
      },
    },
  });

  return Response.json({ dehydratedState: dehydrate(queryClient) });
}

export default function DashboardUsers() {
  return (
    <div>
      <header>
        <h2>Users</h2>
        <p>Manage your users</p>
      </header>
      <div>
        <UsersTable />
      </div>
    </div>
  );
}
