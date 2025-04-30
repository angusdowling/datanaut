using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AppColumn> AppColumns { get; set; }

    public virtual DbSet<AppRow> AppRows { get; set; }

    public virtual DbSet<AppTable> AppTables { get; set; }

    public virtual DbSet<Current> Currents { get; set; }

    public virtual DbSet<LoginToken> LoginTokens { get; set; }

    public virtual DbSet<Migration> Migrations { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Tenant> Tenants { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Workspace> Workspaces { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=DB_CONNECTION");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<AppColumn>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("app_columns_pkey");

            entity.ToTable("app_columns");

            entity.HasIndex(e => new { e.TableId, e.Name }, "app_columns_table_id_name_key").IsUnique();

            entity.HasIndex(e => e.TableId, "idx_app_columns_table");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Config)
                .HasColumnType("jsonb")
                .HasColumnName("config");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.IsRequired)
                .HasDefaultValue(false)
                .HasColumnName("is_required");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Options)
                .HasColumnType("jsonb")
                .HasColumnName("options");
            entity.Property(e => e.Position).HasColumnName("position");
            entity.Property(e => e.TableId).HasColumnName("table_id");
            entity.Property(e => e.Type).HasColumnName("type");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Table).WithMany(p => p.AppColumns)
                .HasForeignKey(d => d.TableId)
                .HasConstraintName("app_columns_table_id_fkey");
        });

        modelBuilder.Entity<AppRow>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("app_rows_pkey");

            entity.ToTable("app_rows");

            entity.HasIndex(e => e.Data, "idx_app_rows_data").HasMethod("gin");

            entity.HasIndex(e => e.TableId, "idx_app_rows_table");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.Data)
                .HasDefaultValueSql("'{}'::jsonb")
                .HasColumnType("jsonb")
                .HasColumnName("data");
            entity.Property(e => e.TableId).HasColumnName("table_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Table).WithMany(p => p.AppRows)
                .HasForeignKey(d => d.TableId)
                .HasConstraintName("app_rows_table_id_fkey");
        });

        modelBuilder.Entity<AppTable>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("app_tables_pkey");

            entity.ToTable("app_tables");

            entity.HasIndex(e => new { e.WorkspaceId, e.Name }, "app_tables_workspace_id_name_key").IsUnique();

            entity.HasIndex(e => e.WorkspaceId, "idx_app_tables_workspace");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");
            entity.Property(e => e.WorkspaceId).HasColumnName("workspace_id");

            entity.HasOne(d => d.Workspace).WithMany(p => p.AppTables)
                .HasForeignKey(d => d.WorkspaceId)
                .HasConstraintName("app_tables_workspace_id_fkey");
        });

        modelBuilder.Entity<Current>(entity =>
        {
            entity.HasKey(e => e.Filename).HasName("current_pkey");

            entity.ToTable("current", "graphile_migrate");

            entity.Property(e => e.Filename)
                .HasDefaultValueSql("'current.sql'::text")
                .HasColumnName("filename");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.Date)
                .HasDefaultValueSql("now()")
                .HasColumnName("date");
        });

        modelBuilder.Entity<LoginToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("login_tokens_pkey");

            entity.ToTable("login_tokens");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.Used)
                .HasDefaultValue(false)
                .HasColumnName("used");
        });

        modelBuilder.Entity<Migration>(entity =>
        {
            entity.HasKey(e => e.Hash).HasName("migrations_pkey");

            entity.ToTable("migrations", "graphile_migrate");

            entity.Property(e => e.Hash).HasColumnName("hash");
            entity.Property(e => e.Date)
                .HasDefaultValueSql("now()")
                .HasColumnName("date");
            entity.Property(e => e.Filename).HasColumnName("filename");
            entity.Property(e => e.PreviousHash).HasColumnName("previous_hash");

            entity.HasOne(d => d.PreviousHashNavigation).WithMany(p => p.InversePreviousHashNavigation)
                .HasForeignKey(d => d.PreviousHash)
                .HasConstraintName("migrations_previous_hash_fkey");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("roles_pkey");

            entity.ToTable("roles");

            entity.HasIndex(e => e.Name, "roles_name_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Permissions)
                .HasColumnType("jsonb")
                .HasColumnName("permissions");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("tenants_pkey");

            entity.ToTable("tenants");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.TenantId, "idx_users_tenant_id");

            entity.HasIndex(e => e.Email, "users_email_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.TenantId).HasColumnName("tenant_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_role_id_fkey");

            entity.HasOne(d => d.Tenant).WithMany(p => p.Users)
                .HasForeignKey(d => d.TenantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_tenant_id_fkey");
        });

        modelBuilder.Entity<Workspace>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("workspaces_pkey");

            entity.ToTable("workspaces");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.TenantId).HasColumnName("tenant_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Tenant).WithMany(p => p.Workspaces)
                .HasForeignKey(d => d.TenantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("workspaces_tenant_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
