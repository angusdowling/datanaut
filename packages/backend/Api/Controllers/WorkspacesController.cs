using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Datanaut.Api.Models;
using Datanaut.Api.Services;
using Datanaut.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Datanaut.Api.Controllers
{
    [ApiController]
    [Route("workspaces")]
    [Authorize]
    public class WorkspacesController : ControllerBase
    {
        private readonly IService<Workspace> _workspaceService;
        private readonly IMapper _mapper;

        public WorkspacesController(IService<Workspace> workspaceService, IMapper mapper)
        {
            _workspaceService = workspaceService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkspaceDto>>> GetWorkspaces(
            [FromQuery] Guid? tenantId
        )
        {
            IEnumerable<Workspace> workspaces;
            if (tenantId.HasValue)
            {
                workspaces = await _workspaceService.FindAsync(w => w.TenantId == tenantId.Value);
            }
            else
            {
                workspaces = await _workspaceService.GetAllAsync();
            }
            return Ok(_mapper.Map<IEnumerable<WorkspaceDto>>(workspaces));
        }

        [HttpPost]
        public async Task<ActionResult<WorkspaceDto>> CreateWorkspace(
            [FromBody] CreateWorkspaceDto request
        )
        {
            if (string.IsNullOrEmpty(request?.Name) || request.TenantId == Guid.Empty)
            {
                return BadRequest("Name and TenantId are required");
            }

            var workspace = _mapper.Map<Workspace>(request);
            var createdWorkspace = await _workspaceService.CreateAsync(workspace);
            return CreatedAtAction(
                nameof(GetWorkspace),
                new { id = createdWorkspace.Id },
                _mapper.Map<WorkspaceDto>(createdWorkspace)
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkspaceDto>> GetWorkspace(Guid id)
        {
            var workspace = await _workspaceService.GetByIdAsync(id);
            if (workspace == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<WorkspaceDto>(workspace));
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<WorkspaceDto>> UpdateWorkspace(
            Guid id,
            [FromBody] UpdateWorkspaceDto request
        )
        {
            var workspace = await _workspaceService.GetByIdAsync(id);
            if (workspace == null)
            {
                return NotFound();
            }

            _mapper.Map(request, workspace);
            var updatedWorkspace = await _workspaceService.UpdateAsync(workspace);
            return Ok(_mapper.Map<WorkspaceDto>(updatedWorkspace));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkspace(Guid id)
        {
            var workspace = await _workspaceService.GetByIdAsync(id);
            if (workspace == null)
            {
                return NotFound();
            }

            await _workspaceService.DeleteAsync(id);
            return NoContent();
        }
    }
}
