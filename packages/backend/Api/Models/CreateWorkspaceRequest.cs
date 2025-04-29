using System;

namespace Datanaut.Api.Models
{
    public class CreateWorkspaceRequest
    {
        public string Name { get; set; } = string.Empty;
        public Guid TenantId { get; set; }
    }
}
