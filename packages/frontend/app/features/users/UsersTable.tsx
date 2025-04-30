import { useMemo, useState } from "react";
import { DataTable } from "~/components/DataTable";
import { User } from "~/services/api/model";
import { useGetUsers, usePatchUsersId } from "~/services/api/users/users";
import { debounce } from "~/utilities/debounce";

const columns = [
  {
    accessor: "id" as "id",
    header: "ID",
    type: "text" as "text",
  },
  {
    accessor: "tenantId" as "tenantId",
    header: "Tenant ID",
    type: "text" as "text",
  },
  {
    accessor: "roleId" as "roleId",
    header: "Role ID",
    type: "text" as "text",
  },
  {
    accessor: "email" as "email",
    header: "Email",
    type: "text" as "text",
  },
  {
    accessor: "name" as "name",
    header: "Name",
    type: "text" as "text",
  },
  {
    accessor: "createdAt" as "createdAt",
    header: "Created At",
    type: "text" as "text",
  },
  {
    accessor: "updatedAt" as "updatedAt",
    header: "Updated At",
    type: "text" as "text",
  },
];

export const UsersTable = () => {
  console.log("users table");
  const { data: response } = useGetUsers();
  const { mutateAsync: patchUser } = usePatchUsersId();
  const [tableData, setTableData] = useState<User[]>();

  // Raw patch function
  const patchRecord = async (
    recordIndex: number,
    columnId: string,
    value: any
  ) => {
    console.log("patching record:", recordIndex, columnId, value);
    const recordId = tableData?.[recordIndex].id;

    if (recordId) {
      await patchUser({
        id: recordId,
        data: {
          [columnId]: value,
        },
      });
    }
  };

  // Debounced version (stable across renders)
  const debouncedPatchRecord = useMemo(() => {
    return debounce((recordIndex: number, columnId: string, value: any) => {
      patchRecord(recordIndex, columnId, value);
    }, 500);
  }, []);

  return (
    <>
      {response?.data && (
        <DataTable
          patchRecord={debouncedPatchRecord}
          data={tableData || response.data}
          setData={setTableData}
          columns={columns}
        />
      )}
    </>
  );
};
