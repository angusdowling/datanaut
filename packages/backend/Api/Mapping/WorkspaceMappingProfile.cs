using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Mapping
{
    public class WorkspaceMappingProfile : Profile
    {
        public WorkspaceMappingProfile()
        {
            CreateMap<Workspace, WorkspaceDto>();
            CreateMap<CreateWorkspaceDto, Workspace>();
            CreateMap<UpdateWorkspaceDto, Workspace>();
        }
    }
}
