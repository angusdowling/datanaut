using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class RowMappingProfile : Profile
    {
        public RowMappingProfile()
        {
            CreateMap<AppRow, RowDto>()
                .ForMember(dest => dest.Cells, opt => opt.MapFrom(src => src.AppCells));
            CreateMap<CreateRowDto, AppRow>();
            CreateMap<UpdateRowDto, AppRow>();
        }
    }
}
