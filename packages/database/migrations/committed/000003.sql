--! Previous: sha1:e043f3615502424d101c203b535ccadf24673ad2
--! Hash: sha1:83728acb8caf6aa3845908cb44ff42e3177e2f2f

-- Remove role based policies
drop policy if exists regular_user_update on users cascade;
drop policy if exists guest_viewer_access on users cascade;
drop policy if exists regular_user_select on users cascade;
drop policy if exists tenant_admin_manage on users cascade;
drop policy if exists platform_admin_bypass on users cascade;

drop table if exists login_tokens cascade;
create table login_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Remove password_hash from user table
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_hash";

-- Add tenant_id foreign key to workspaces table
ALTER TABLE "workspaces" ADD COLUMN IF NOT EXISTS "tenant_id" uuid NOT NULL REFERENCES "tenants"("id");

-- Update workspaces row-level security policies to use permissions
DROP POLICY IF EXISTS select_own_workspaces ON workspaces;
CREATE POLICY select_own_workspaces ON workspaces
  FOR SELECT USING (
    (tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'view_workspace') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

DROP POLICY IF EXISTS insert_own_workspaces ON workspaces;
CREATE POLICY insert_own_workspaces ON workspaces
  FOR INSERT WITH CHECK (
    (tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'create_workspace') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

DROP POLICY IF EXISTS update_own_workspaces ON workspaces;
CREATE POLICY update_own_workspaces ON workspaces
  FOR UPDATE USING (
    (tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'edit_workspace') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

DROP POLICY IF EXISTS delete_own_workspaces ON workspaces;
CREATE POLICY delete_own_workspaces ON workspaces
  FOR DELETE USING (
    (tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'delete_workspace') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

-- App tables policies
drop policy if exists select_own_app_tables on app_tables cascade;
create policy select_own_app_tables on app_tables
  for select using (
    (workspace_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'view_app_table') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists insert_own_app_tables on app_tables cascade;
create policy insert_own_app_tables on app_tables
  for insert with check (
    (workspace_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'create_app_table') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists update_own_app_tables on app_tables cascade;
create policy update_own_app_tables on app_tables
  for update using (
    (workspace_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'edit_app_table') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists delete_own_app_tables on app_tables cascade;
create policy delete_own_app_tables on app_tables
  for delete using (
    (workspace_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'delete_app_table') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

-- App columns policies
drop policy if exists select_own_app_columns on app_columns cascade;
create policy select_own_app_columns on app_columns
  for select using (
    (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid) AND
    current_setting('app.current_user_permissions')::jsonb ? 'view_app_column') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists insert_own_app_columns on app_columns cascade;
create policy insert_own_app_columns on app_columns
  for insert with check (
    (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid) AND
    current_setting('app.current_user_permissions')::jsonb ? 'create_app_column') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

-- App rows policies
drop policy if exists select_own_app_rows on app_rows cascade;
create policy select_own_app_rows on app_rows
  for select using (
    (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid) AND
    current_setting('app.current_user_permissions')::jsonb ? 'view_app_row') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists insert_own_app_rows on app_rows cascade;
create policy insert_own_app_rows on app_rows
  for insert with check (
    (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid) AND
    current_setting('app.current_user_permissions')::jsonb ? 'create_app_row') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists update_own_app_rows on app_rows cascade;
create policy update_own_app_rows on app_rows
  for update using (
    (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid) AND
    current_setting('app.current_user_permissions')::jsonb ? 'edit_app_row') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists delete_own_app_rows on app_rows cascade;
create policy delete_own_app_rows on app_rows
  for delete using (
    (table_id IN (SELECT id FROM app_tables WHERE workspace_id = current_setting('app.current_tenant_id')::uuid) AND
    current_setting('app.current_user_permissions')::jsonb ? 'delete_app_row') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

-- Users policies
drop policy if exists select_own_users on users cascade;
create policy select_own_users on users
  for select using (
    (tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'view_user') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists insert_own_users on users cascade;
create policy insert_own_users on users
  for insert with check (
    (tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'create_user') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists update_own_users on users cascade;
create policy update_own_users on users
  for update using (
    (tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'edit_user') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists delete_own_users on users cascade;
create policy delete_own_users on users
  for delete using (
    (tenant_id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'delete_user') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

-- Tenants policies
drop policy if exists select_own_tenants on tenants cascade;
create policy select_own_tenants on tenants
  for select using (
    (id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'view_tenant') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists insert_own_tenants on tenants cascade;
create policy insert_own_tenants on tenants
  for insert with check (
    current_setting('app.current_user_permissions')::jsonb ? 'create_tenant' OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists update_own_tenants on tenants cascade;
create policy update_own_tenants on tenants
  for update using (
    (id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'edit_tenant') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists delete_own_tenants on tenants cascade;
create policy delete_own_tenants on tenants
  for delete using (
    (id = current_setting('app.current_tenant_id')::uuid AND
    current_setting('app.current_user_permissions')::jsonb ? 'delete_tenant') OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

-- Roles policies
drop policy if exists select_own_roles on roles cascade;
create policy select_own_roles on roles
  for select using (
    current_setting('app.current_user_permissions')::jsonb ? 'view_role' OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists insert_own_roles on roles cascade;
create policy insert_own_roles on roles
  for insert with check (
    current_setting('app.current_user_permissions')::jsonb ? 'create_role' OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists update_own_roles on roles cascade;
create policy update_own_roles on roles
  for update using (
    current_setting('app.current_user_permissions')::jsonb ? 'edit_role' OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );

drop policy if exists delete_own_roles on roles cascade;
create policy delete_own_roles on roles
  for delete using (
    current_setting('app.current_user_permissions')::jsonb ? 'delete_role' OR
    current_setting('app.current_user_permissions')::jsonb ? 'platform_admin'
  );
