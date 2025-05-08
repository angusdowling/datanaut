using System;
using System.Collections.Generic;
using Datanaut.Models;

namespace Datanaut.Api.Models
{
    public class WorkspaceDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required TenantDto Tenant { get; set; }
        public required List<TableDto> Tables { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required DateTime UpdatedAt { get; set; }
    }

    public class CreateWorkspaceDto
    {
        public required string Name { get; set; }
        public required Guid TenantId { get; set; }
    }

    public class UpdateWorkspaceDto
    {
        public string? Name { get; set; }
    }
}
