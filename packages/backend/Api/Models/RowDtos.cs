using System;
using System.Collections.Generic;
using Datanaut.Models;

namespace Datanaut.Api.Models
{
    public class RowDto
    {
        public Guid Id { get; set; }
        public required Guid TableId { get; set; }
        public required Guid CreatedBy { get; set; }
        public required List<CellDto> Cells { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required DateTime UpdatedAt { get; set; }
        public int? Position { get; set; }
    }

    public class CreateRowDto
    {
        public required Guid TableId { get; set; }
        public int? Position { get; set; }
    }

    public class UpdateRowDto
    {
        public List<UpdateRowCellDto>? Cells { get; set; }
        public int? Position { get; set; }
    }
}
