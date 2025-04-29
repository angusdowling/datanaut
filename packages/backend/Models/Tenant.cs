using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class Tenant
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();

    public virtual ICollection<Workspace> Workspaces { get; set; } = new List<Workspace>();
}
