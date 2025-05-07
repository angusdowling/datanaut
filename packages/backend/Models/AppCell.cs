using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class AppCell
{
    public Guid Id { get; set; }

    public Guid RowId { get; set; }

    public Guid ColumnId { get; set; }

    public string Value { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual AppColumn Column { get; set; } = null!;

    public virtual AppRow Row { get; set; } = null!;
}
