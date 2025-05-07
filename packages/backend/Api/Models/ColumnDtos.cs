using System;

namespace Datanaut.Api.Models
{
    public class ColumnDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public required Guid TableId { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required DateTime UpdatedAt { get; set; }
    }

    public class CreateColumnDto
    {
        public required string Name { get; set; }
        public required string Type { get; set; }
        public required Guid TableId { get; set; }
        public int Position { get; set; }
        public bool IsRequired { get; set; }
        public string? Config { get; set; }
        public string? Options { get; set; }
    }

    public class UpdateColumnDto
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
    }
}
