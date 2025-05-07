using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Tenant, opt => opt.MapFrom(src => src.Tenant))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));

            CreateMap<CreateUserDto, User>()
                .ForMember(dest => dest.TenantId, opt => opt.MapFrom(src => src.TenantId))
                .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.RoleId));

            CreateMap<UpdateUserDto, User>()
                .ForMember(
                    dest => dest.Email,
                    opt => opt.MapFrom((src, dest) => src.Email ?? dest.Email)
                )
                .ForMember(
                    dest => dest.Name,
                    opt => opt.MapFrom((src, dest) => src.Name ?? dest.Name)
                )
                .ForMember(
                    dest => dest.TenantId,
                    opt => opt.MapFrom((src, dest) => src.TenantId ?? dest.TenantId)
                )
                .ForMember(
                    dest => dest.RoleId,
                    opt => opt.MapFrom((src, dest) => src.RoleId ?? dest.RoleId)
                );
        }
    }
}
