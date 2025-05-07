import { MetaFunction } from "@remix-run/node";
import { WorkspacesTable } from "~/features/workspaces/WorkspacesTable";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut - Workspaces" },
    { name: "description", content: "Manage your workspaces" },
  ];
};

export default function DashboardWorkspaces() {
  return (
    <div>
      <header>
        <h2>Workspaces</h2>
        <p>Manage your workspaces</p>
      </header>
      <div>
        <WorkspacesTable />
      </div>
    </div>
  );
}
