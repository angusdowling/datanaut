using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class RowMappingProfile : Profile
    {
        public RowMappingProfile()
        {
            CreateMap<AppRow, RowDto>();
            CreateMap<CreateRowDto, AppRow>();
            CreateMap<UpdateRowDto, AppRow>();
        }
    }
}
