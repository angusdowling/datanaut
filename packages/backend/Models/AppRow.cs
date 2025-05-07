using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class AppRow
{
    public Guid Id { get; set; }

    public Guid TableId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<AppCell> AppCells { get; set; } = new List<AppCell>();

    public virtual AppTable Table { get; set; } = null!;
}
