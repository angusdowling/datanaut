using System;

namespace Datanaut.Api.Models
{
    public class TenantDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
    }

    public class CreateTenantDto
    {
        public required string Name { get; set; }
    }

    public class UpdateTenantDto
    {
        public required string Name { get; set; }
    }
}
