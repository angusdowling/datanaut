--! Previous: sha1:b16552e1b65ca18a2323f5789e2a6290be8e9332
--! Hash: sha1:e043f3615502424d101c203b535ccadf24673ad2

-- Create roles table
drop table if exists roles cascade;
create table roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  permissions jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create tenants table
drop table if exists tenants cascade;
create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create multi-tenant users table
drop table if exists users cascade;
create table users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  role_id uuid not null,
  email text not null unique,
  name text not null,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (tenant_id) references tenants(id),
  foreign key (role_id) references roles(id)
);

-- Create index for tenant_id to improve query performance
create index idx_users_tenant_id on users(tenant_id);

-- Enable row level security
alter table users enable row level security;
alter table workspaces enable row level security;
alter table app_tables enable row level security;
alter table app_columns enable row level security;
alter table app_rows enable row level security;

-- Create row level security policies
drop policy if exists select_own_users on users cascade;
create policy select_own_users on users
  for select using (tenant_id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists insert_own_users on users cascade;
create policy insert_own_users on users
  for insert with check (tenant_id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists update_own_users on users cascade;
create policy update_own_users on users
  for update using (tenant_id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists delete_own_users on users cascade;
create policy delete_own_users on users
  for delete using (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Workspaces policies
drop policy if exists select_own_workspaces on workspaces cascade;
create policy select_own_workspaces on workspaces
  for select using (id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists insert_own_workspaces on workspaces cascade;
create policy insert_own_workspaces on workspaces
  for insert with check (id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists update_own_workspaces on workspaces cascade;
create policy update_own_workspaces on workspaces
  for update using (id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists delete_own_workspaces on workspaces cascade;
create policy delete_own_workspaces on workspaces
  for delete using (id = current_setting('app.current_tenant_id')::uuid);

-- App tables policies
drop policy if exists select_own_app_tables on app_tables cascade;
create policy select_own_app_tables on app_tables
  for select using (workspace_id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists insert_own_app_tables on app_tables cascade;
create policy insert_own_app_tables on app_tables
  for insert with check (workspace_id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists update_own_app_tables on app_tables cascade;
create policy update_own_app_tables on app_tables
  for update using (workspace_id = current_setting('app.current_tenant_id')::uuid);

drop policy if exists delete_own_app_tables on app_tables cascade;
create policy delete_own_app_tables on app_tables
  for delete using (workspace_id = current_setting('app.current_tenant_id')::uuid);

-- App columns policies
drop policy if exists select_own_app_columns on app_columns cascade;
create policy select_own_app_columns on app_columns
  for select using (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid));

drop policy if exists insert_own_app_columns on app_columns cascade;
create policy insert_own_app_columns on app_columns
  for insert with check (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid));

drop policy if exists update_own_app_columns on app_columns cascade;
create policy update_own_app_columns on app_columns
  for update using (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid));

drop policy if exists delete_own_app_columns on app_columns cascade;
create policy delete_own_app_columns on app_columns
  for delete using (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid));

-- App rows policies
drop policy if exists select_own_app_rows on app_rows cascade;
create policy select_own_app_rows on app_rows
  for select using (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid));

drop policy if exists insert_own_app_rows on app_rows cascade;
create policy insert_own_app_rows on app_rows
  for insert with check (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid));

drop policy if exists update_own_app_rows on app_rows cascade;
create policy update_own_app_rows on app_rows
  for update using (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid));

drop policy if exists delete_own_app_rows on app_rows cascade;
create policy delete_own_app_rows on app_rows
  for delete using (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid));

-- Role-based policies
-- Platform Admin can access all tenants
drop policy if exists platform_admin_bypass on users cascade;
create policy platform_admin_bypass on users
  for all using (current_setting('app.current_user_role') = 'platform_admin');

-- Tenant Admin can manage their own tenant
drop policy if exists tenant_admin_manage on users cascade;
create policy tenant_admin_manage on users
  for all using (
    tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_role') = 'tenant_admin'
  );

-- Regular User can view all users in their tenant
drop policy if exists regular_user_select on users cascade;
create policy regular_user_select on users
  for select using (
    tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_role') = 'regular_user'
  );

-- Regular User can only edit their own profile
drop policy if exists regular_user_update on users cascade;
create policy regular_user_update on users
  for update using (
    id = current_setting('app.current_user_id')::uuid AND
    tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_role') = 'regular_user'
  );

-- Guest/Viewer has read-only access
drop policy if exists guest_viewer_access on users cascade;
create policy guest_viewer_access on users
  for select using (
    tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_role') = 'guest'
  );
