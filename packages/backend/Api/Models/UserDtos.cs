using System;

namespace Datanaut.Api.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
        public required TenantDto Tenant { get; set; }
        public required RoleDto Role { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required DateTime UpdatedAt { get; set; }
    }

    public class CreateUserDto
    {
        public required string Email { get; set; }
        public required string Name { get; set; }
        public Guid TenantId { get; set; }
        public Guid RoleId { get; set; }
    }

    public class UpdateUserDto
    {
        public string? Email { get; set; }
        public string? Name { get; set; }
        public Guid? TenantId { get; set; }
        public Guid? RoleId { get; set; }
    }
}
