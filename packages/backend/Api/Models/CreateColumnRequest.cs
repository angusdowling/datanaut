using System;

namespace Datanaut.Api.Models
{
    public class CreateColumnRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public Guid TableId { get; set; }
        public int Position { get; set; }
        public bool IsRequired { get; set; }
        public string? Config { get; set; }
        public string? Options { get; set; }
    }
}
