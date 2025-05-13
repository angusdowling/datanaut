using System.Text.Json;
using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class CellMappingProfile : Profile
    {
        public CellMappingProfile()
        {
            CreateMap<AppCell, CellDto>()
                .ForMember(
                    static dest => dest.Column,
                    static opt => opt.MapFrom(static src => src.Column)
                );
            CreateMap<CreateCellDto, AppCell>();
            _ = CreateMap<UpdateCellDto, AppCell>()
                .ForMember(
                    static dest => dest.Value,
                    static opt =>
                        opt.MapFrom(static src =>
                            JsonSerializer.Serialize(src.Value, new JsonSerializerOptions())
                        )
                );
        }
    }
}
