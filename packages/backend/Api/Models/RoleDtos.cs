using System;

namespace Datanaut.Api.Models
{
    public class RoleDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Permissions { get; set; }
    }

    public class CreateRoleDto
    {
        public required string Name { get; set; }
        public required string Permissions { get; set; }
    }

    public class UpdateRoleDto
    {
        public required string Name { get; set; }
        public required string Permissions { get; set; }
    }
}
