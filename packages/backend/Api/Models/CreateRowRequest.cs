using System;

namespace Datanaut.Api.Models
{
    public class CreateRowRequest
    {
        public string Data { get; set; } = string.Empty;
        public Guid TableId { get; set; }
    }
}
