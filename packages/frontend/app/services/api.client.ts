import queryString from "query-string";
import { AppColumn, AppTable, Tenant, User } from "~/models";

const API_BASE_URL = "/api";

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Tenants
export async function deleteTenant(tenantId: string): Promise<void> {
  return apiRequest(`${API_BASE_URL}/tenants/${tenantId}`, {
    method: "DELETE",
  });
}

export async function getTenants(): Promise<Tenant[]> {
  return apiRequest(`${API_BASE_URL}/tenants`);
}

export async function getTenant(tenantId: string): Promise<Tenant> {
  return apiRequest(`${API_BASE_URL}/tenants/${tenantId}`);
}

export async function createTenant(
  tenant: Omit<Tenant, "id">
): Promise<Tenant> {
  return apiRequest(`${API_BASE_URL}/tenants`, {
    method: "POST",
    body: JSON.stringify(tenant),
  });
}

export async function updateTenant(
  tenantId: string,
  tenant: Partial<Tenant>
): Promise<Tenant> {
  return apiRequest(`${API_BASE_URL}/tenants/${tenantId}`, {
    method: "PUT",
    body: JSON.stringify(tenant),
  });
}

// Users
export async function deleteUser(userId: string): Promise<void> {
  return apiRequest(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });
}

export async function getUsers(params?: {
  tenantId?: string;
  email?: string;
}): Promise<User[]> {
  const url = params
    ? `${API_BASE_URL}/users?${queryString.stringify(params)}`
    : `${API_BASE_URL}/users`;

  return apiRequest(url);
}

export async function getUser(userId: string): Promise<User> {
  return apiRequest(`${API_BASE_URL}/users/${userId}`);
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  return apiRequest(`${API_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function updateUser(
  userId: string,
  user: Partial<User>
): Promise<User> {
  return apiRequest(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

// Tables
export async function deleteTable(tableId: string): Promise<void> {
  return apiRequest(`${API_BASE_URL}/tables/${tableId}`, {
    method: "DELETE",
  });
}

export async function getTables(): Promise<AppTable[]> {
  return apiRequest(`${API_BASE_URL}/tables`);
}

export async function getTable(tableId: string): Promise<AppTable> {
  return apiRequest(`${API_BASE_URL}/tables/${tableId}`);
}

export async function createTable(
  table: Omit<AppTable, "id">
): Promise<AppTable> {
  return apiRequest(`${API_BASE_URL}/tables`, {
    method: "POST",
    body: JSON.stringify(table),
  });
}

export async function updateTable(
  tableId: string,
  table: Partial<AppTable>
): Promise<AppTable> {
  return apiRequest(`${API_BASE_URL}/tables/${tableId}`, {
    method: "PUT",
    body: JSON.stringify(table),
  });
}

// Columns
export async function deleteColumn(columnId: string): Promise<unknown> {
  return apiRequest(`${API_BASE_URL}/columns/${columnId}`, {
    method: "DELETE",
  });
}

export async function getColumns(): Promise<AppColumn[]> {
  return apiRequest(`${API_BASE_URL}/columns`);
}

export async function getColumn(columnId: string): Promise<AppColumn> {
  return apiRequest(`${API_BASE_URL}/columns/${columnId}`);
}

export async function createColumn(
  column: Omit<AppColumn, "id">
): Promise<AppColumn> {
  return apiRequest(`${API_BASE_URL}/columns`, {
    method: "POST",
    body: JSON.stringify(column),
  });
}

export async function updateColumn(
  columnId: string,
  column: Partial<AppColumn>
): Promise<AppColumn> {
  return apiRequest(`${API_BASE_URL}/columns/${columnId}`, {
    method: "PUT",
    body: JSON.stringify(column),
  });
}
