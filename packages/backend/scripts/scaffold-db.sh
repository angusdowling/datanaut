#!/bin/bash

# Database scaffolding script
# Usage: ./scaffold-db.sh

dotnet ef dbcontext scaffold "Name=DB_CONNECTION" Npgsql.EntityFrameworkCore.PostgreSQL -o Models -c ApplicationDbContext --force 