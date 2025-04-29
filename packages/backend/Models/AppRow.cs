using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class AppRow
{
    public Guid Id { get; set; }

    public Guid TableId { get; set; }

    public string Data { get; set; } = null!;

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual AppTable Table { get; set; } = null!;
}
