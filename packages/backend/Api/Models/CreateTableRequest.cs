using System;

namespace Datanaut.Api.Models
{
    public class CreateTableRequest
    {
        public string Name { get; set; } = string.Empty;
        public Guid WorkspaceId { get; set; }
    }
}
