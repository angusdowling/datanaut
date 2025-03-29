# Datanaut Database Package

This package contains the database schema, migrations, and configuration for the Datanaut project. We use PostgreSQL as our database and Graphile Migrate for managing database migrations.

## Setup

1. Make sure you have PostgreSQL running locally. The easiest way is to use Docker:

   ```bash
   docker-compose up -d postgres
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. The database connection is configured in `graphile-migrate.config.js` with the following default settings:
   - Host: localhost
   - Port: 5432
   - Database: datanaut
   - User: datanaut
   - Password: datanaut

## Migration Commands

We use Graphile Migrate for managing database migrations. The following commands are available:

- `yarn watch` - Starts the migration watcher that automatically applies changes
- `yarn migrate` - Runs pending migrations
- `yarn commit` - Commits the current migration

## Development Workflow

1. Start the migration watcher:

   ```bash
   yarn watch
   ```

2. Make changes to `current.sql`. The watcher will automatically apply your changes.

3. Once you're happy with your changes, commit the migration:
   ```bash
   yarn commit --message "description of your changes"
   ```

## Contributing

### Adding New Tables

1. Create your table in `current.sql` using the following template:

   ```sql
   drop table if exists your_table_name cascade;
   create table your_table_name (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     updated_at timestamptz not null default now()
   );
   ```

2. Add appropriate indexes and foreign key constraints.

3. Add row level security policies if needed.

### Modifying Existing Tables

1. Add new columns using `alter table`.
2. Never modify or remove existing columns in production to maintain backward compatibility.
3. Use database triggers for complex data validations.

### Best Practices

- Always include `created_at` and `updated_at` timestamps
- Use UUIDs for primary keys
- Add appropriate indexes for foreign keys and frequently queried columns
- Write clear migration descriptions when committing

### Testing

1. Make sure your migrations can be applied cleanly to a fresh database
2. Test both forward and rollback migrations
3. Verify data integrity after schema changes
4. Check that row level security policies work as expected

## Schema Overview

All tables include standard audit fields:

- `id`: UUID primary key
- `created_at`: Timestamp of record creation
- `updated_at`: Timestamp of last update

## Support

If you encounter any issues or have questions, please:

1. Check existing documentation
2. Review migration files in the `migrations` directory
3. Open an issue with detailed reproduction steps
