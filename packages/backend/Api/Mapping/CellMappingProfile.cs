using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class CellMappingProfile : Profile
    {
        public CellMappingProfile()
        {
            CreateMap<AppCell, CellDto>();
            CreateMap<CreateCellDto, AppCell>();
            CreateMap<UpdateCellDto, AppCell>();
        }
    }
}
