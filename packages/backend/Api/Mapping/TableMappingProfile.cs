using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class TableMappingProfile : Profile
    {
        public TableMappingProfile()
        {
            CreateMap<AppTable, TableDto>();
            CreateMap<CreateTableDto, AppTable>();
            CreateMap<UpdateTableDto, AppTable>();
        }
    }
}
