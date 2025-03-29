import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Table,
  Text,
} from "@radix-ui/themes";
import { Link, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/services/api.client";

export async function loader({ params }: { params: { id: string } }) {
  const users = await getUsers({ tenantId: params.id });
  return { users };
}

export default function TenantUsersRoute() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <Box p="4">
      <Flex justify="between" align="center" mb="4">
        <Heading size="6">Users</Heading>
        <Button asChild>
          <Link to="new">Add User</Link>
        </Button>
      </Flex>

      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Text weight="bold">{user.name}</Text>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Flex gap="2">
                    <Button size="1" variant="soft" asChild>
                      <Link to={`${user.id}/edit`}>Edit</Link>
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Box>
  );
}
