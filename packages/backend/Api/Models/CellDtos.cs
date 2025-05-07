using System;
using System.Collections.Generic;

namespace Datanaut.Api.Models
{
    public class CellDto
    {
        public Guid Id { get; set; }
        public required Guid RowId { get; set; }
        public required Guid ColumnId { get; set; }
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
        public string? Value { get; set; }
    }
}
