import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { UsersTable } from "~/features/users/UsersTable";
import { prefetchGetApiUsers } from "~/services/api/users/users";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut - Users" },
    { name: "description", content: "Manage your users" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie");
  const queryClient = new QueryClient();

  await prefetchGetApiUsers(queryClient, undefined, {
    fetch: {
      headers: {
        Cookie: cookie ?? "",
      },
    },
  });

  return Response.json({ dehydratedState: dehydrate(queryClient) });
}

export default function DashboardUsers() {
  return (
    <div className="users-container">
      <header>
        <h2>Users</h2>
        <p>Manage your users</p>
      </header>
      <div className="users-content">
        <UsersTable />
      </div>
    </div>
  );
}
