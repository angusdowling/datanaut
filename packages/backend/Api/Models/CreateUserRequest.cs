using System;

namespace Datanaut.Api.Models
{
    public class CreateUserRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public Guid TenantId { get; set; }
        public Guid RoleId { get; set; }
    }
}
