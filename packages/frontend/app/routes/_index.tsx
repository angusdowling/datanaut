import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { DataTable } from "~/components/DataTable";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    visits: 10,
    status: "Active",
    progress: 50,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    age: 28,
    visits: 15,
    status: "Inactive",
    progress: 80,
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 90,
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut" },
    {
      name: "description",
      content:
        "Datanaut is a cloud-based platform that combines the functionality of a spreadsheet with a database, allowing users to organize, collaborate on, and customize data in a visually intuitive interface",
    },
  ];
};

export default function Index() {
  const [data, setData] = useState(() => [...defaultData]);

  // useEffect(() => {
  //   console.log("useEffect");

  //   getUsers().then((users) => {
  //     console.log("users", users);
  //   });
  // }, []);

  const columns = [
    {
      accessor: "firstName" as "firstName",
      header: "First Name",
      type: "text" as "text",
    },
    {
      accessor: "lastName" as "lastName",
      header: "Last Name",
      type: "text" as "text",
    },
    { accessor: "age" as "age", header: "Age", type: "number" as "number" },
    {
      accessor: "visits" as "visits",
      header: "Visits",
      type: "number" as "number",
    },
    {
      accessor: "status" as "status",
      header: "Status",
      type: "text" as "text",
    },
    {
      accessor: "progress" as "progress",
      header: "Profile Progress",
      type: "percentage" as "percentage",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      <DataTable data={data} setData={setData} columns={columns} />
    </div>
  );
}
