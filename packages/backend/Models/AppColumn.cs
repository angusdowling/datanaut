using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class AppColumn
{
    public Guid Id { get; set; }

    public Guid TableId { get; set; }

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string? Config { get; set; }

    public int Position { get; set; }

    public bool IsRequired { get; set; }

    public string? Options { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual AppTable Table { get; set; } = null!;
}
