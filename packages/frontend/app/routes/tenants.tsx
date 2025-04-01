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

export async function loader() {
  // const tenants = await getTenants();
  // return { tenants };
}

export default function TenantsRoute() {
  // const { tenants } = useLoaderData<typeof loader>();

  return (
    <Box p="4">
      <Flex justify="between" align="center" mb="4">
        <Heading size="6">Tenants</Heading>
        <Button asChild>
          <Link to="/tenants/new">Create Tenant</Link>
        </Button>
      </Flex>

      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* {tenants.map((tenant) => (
              <Table.Row key={tenant.id}>
                <Table.Cell>
                  <Text weight="bold">{tenant.name}</Text>
                </Table.Cell>
                <Table.Cell>
                  {new Date(tenant.created_at).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="2">
                    <Button size="1" variant="soft" asChild>
                      <Link to={`/tenants/${tenant.id}/users`}>View Users</Link>
                    </Button>
                    <Button size="1" variant="soft" asChild>
                      <Link to={`/tenants/${tenant.id}/edit`}>Edit</Link>
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))} */}
          </Table.Body>
        </Table.Root>
      </Card>
    </Box>
  );
}
