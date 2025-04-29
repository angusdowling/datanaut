using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class AppTable
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public Guid WorkspaceId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<AppColumn> AppColumns { get; set; } = new List<AppColumn>();

    public virtual ICollection<AppRow> AppRows { get; set; } = new List<AppRow>();

    public virtual Workspace Workspace { get; set; } = null!;
}
