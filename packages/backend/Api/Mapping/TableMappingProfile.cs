using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class TableMappingProfile : Profile
    {
        public TableMappingProfile()
        {
            CreateMap<AppTable, TableDto>()
                .ForMember(dest => dest.Workspace, opt => opt.MapFrom(src => src.Workspace))
                .ForMember(dest => dest.Columns, opt => opt.MapFrom(src => src.AppColumns))
                .ForMember(dest => dest.Rows, opt => opt.MapFrom(src => src.AppRows));
            CreateMap<CreateTableDto, AppTable>();
            CreateMap<UpdateTableDto, AppTable>();
        }
    }
}
