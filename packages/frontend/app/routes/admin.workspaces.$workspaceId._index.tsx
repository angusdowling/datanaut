import { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { TablesTable } from "~/features/tables";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut - Workspace" },
    { name: "description", content: "Manage your workspace" },
  ];
};

export default function DashboardWorkspace() {
  const { workspaceId } = useParams();

  if (!workspaceId) {
    return <div>Workspace not found</div>;
  }

  return (
    <div>
      <header>
        <h2>Tables</h2>
        <p>Manage tables in workspace {workspaceId}</p>
      </header>
      <div>
        <TablesTable workspaceId={workspaceId} />
      </div>
    </div>
  );
}
