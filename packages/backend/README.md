# Datanaut Backend

The backend service for Datanaut, built with ASP.NET Core 8.0.

## Technology Stack

- ASP.NET Core 8.0
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- AutoMapper
- Swagger/OpenAPI

## Project Structure

- `Api/`: API controllers and endpoints
- `Application/`: Application services and business logic
- `Models/`: Data models and entities
- `Properties/`: Project configuration files
- `scripts/`: Utility scripts

## Getting Started

### Prerequisites

- .NET 8.0 SDK
- PostgreSQL
- Node.js (for frontend development)

### Environment Setup

1. Copy `.env.example` to `.env` and configure your environment variables:

   ```
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret
   ```

2. Install dependencies:

   ```bash
   dotnet restore
   ```

3. Run database migrations:

   ```bash
   dotnet ef database update
   ```

4. Start the development server:
   ```bash
   dotnet run
   ```

The API will be available at `http://localhost:5173` (or your configured port).

## API Documentation

Swagger documentation is available at `/swagger` when running the application.

## Development

### Adding New Dependencies

Add new NuGet packages using:

```bash
dotnet add package PackageName
```

### Database Migrations

Create a new migration:

```bash
dotnet ef migrations add MigrationName
```

Apply migrations:

```bash
dotnet ef database update
```

## Testing

Run tests using:

```bash
dotnet test
```
