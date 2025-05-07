using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class TenantMappingProfile : Profile
    {
        public TenantMappingProfile()
        {
            CreateMap<Tenant, TenantDto>();
            CreateMap<CreateTenantDto, Tenant>();
            CreateMap<UpdateTenantDto, Tenant>();
        }
    }
}
