using System;
using System.Collections.Generic;

namespace Datanaut.Models;

public partial class Current
{
    public string Filename { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime Date { get; set; }
}
