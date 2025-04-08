import { useEffect, useMemo, useRef, useState } from "react";
import { DataTable } from "~/components/DataTable";
import { User } from "~/services/api/model";
import {
  useGetApiUsers,
  usePatchApiUsersUserId,
} from "~/services/api/users/users";
import { debounce } from "~/utilities/debounce";

const columns = [
  {
    accessor: "id" as "id",
    header: "ID",
    type: "text" as "text",
  },
  {
    accessor: "tenant_id" as "tenant_id",
    header: "Tenant ID",
    type: "text" as "text",
  },
  {
    accessor: "role_id" as "role_id",
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
    accessor: "created_at" as "created_at",
    header: "Created At",
    type: "text" as "text",
  },
  {
    accessor: "updated_at" as "updated_at",
    header: "Updated At",
    type: "text" as "text",
  },
];

export const UsersTable = () => {
  const { data: response } = useGetApiUsers();
  const { mutateAsync: patchUser } = usePatchApiUsersUserId();
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
        userId: recordId,
        data: {
          data: {
            [columnId]: value,
          },
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
