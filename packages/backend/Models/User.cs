using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class User
{
    public Guid Id { get; set; }

    public Guid TenantId { get; set; }

    public Guid RoleId { get; set; }

    public string Email { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual Tenant Tenant { get; set; } = null!;
}
