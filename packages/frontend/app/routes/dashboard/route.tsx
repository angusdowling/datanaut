import { Link, Outlet } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut Dashboard" },
    { name: "description", content: "Datanaut Dashboard" },
  ];
};

export default function Dashboard() {
  return (
    <div>
      <header>
        <h1>Datanaut Dashboard</h1>
      </header>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/workspaces">Workspaces</Link>
            </li>
            <li>
              <Link to="/dashboard/users">Users</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
