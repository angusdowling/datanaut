import { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { TableGrid } from "~/components/TableGrid";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut - Table View" },
    { name: "description", content: "View and manage your table data" },
  ];
};

export default function TableView() {
  const { tableId } = useParams();

  if (!tableId) {
    return <div>Table not found</div>;
  }

  return <TableGrid tableId={tableId} />;
}
