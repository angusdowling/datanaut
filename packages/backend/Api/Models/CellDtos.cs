using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Datanaut.Api.Models
{
    public class CellDto
    {
        public Guid Id { get; set; }
        public required Guid RowId { get; set; }
        public required ColumnDto Column { get; set; }
        public string? Value { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required DateTime UpdatedAt { get; set; }
    }

    public class CreateCellDto
    {
        public required Guid RowId { get; set; }
        public required Guid ColumnId { get; set; }
        public string? Value { get; set; }
    }

    public class UpdateCellDto
    {
        public object? Value { get; set; }
    }

    public class UpdateRowCellDto
    {
        public required Guid Id { get; set; }
        public string? Value { get; set; }
    }
}
