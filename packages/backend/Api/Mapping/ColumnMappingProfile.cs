using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class ColumnMappingProfile : Profile
    {
        public ColumnMappingProfile()
        {
            CreateMap<AppColumn, ColumnDto>();
            CreateMap<CreateColumnDto, AppColumn>();
            CreateMap<UpdateColumnDto, AppColumn>();
        }
    }
}
