using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class Workspace
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public Guid TenantId { get; set; }

    public virtual ICollection<AppTable> AppTables { get; set; } = new List<AppTable>();

    public virtual Tenant Tenant { get; set; } = null!;
}
