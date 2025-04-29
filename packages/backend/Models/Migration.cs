using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class Migration
{
    public string Hash { get; set; } = null!;

    public string? PreviousHash { get; set; }

    public string Filename { get; set; } = null!;

    public DateTime Date { get; set; }

    public virtual ICollection<Migration> InversePreviousHashNavigation { get; set; } = new List<Migration>();

    public virtual Migration? PreviousHashNavigation { get; set; }
}
