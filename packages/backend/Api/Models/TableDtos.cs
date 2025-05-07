using System;
using System.Collections.Generic;

namespace Datanaut.Api.Models
{
    public class TableDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required Guid WorkspaceId { get; set; }
        public required List<ColumnDto> Columns { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required DateTime UpdatedAt { get; set; }
    }

    public class CreateTableDto
    {
        public required string Name { get; set; }
        public required Guid WorkspaceId { get; set; }
        public required List<CreateColumnDto> Columns { get; set; }
    }

    public class UpdateTableDto
    {
        public string? Name { get; set; }
        public List<CreateColumnDto>? Columns { get; set; }
    }
}
