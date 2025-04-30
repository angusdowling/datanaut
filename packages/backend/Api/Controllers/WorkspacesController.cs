using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
    public class WorkspacesController(IService<Workspace> workspaceService) : ControllerBase
    {
        private readonly IService<Workspace> _workspaceService = workspaceService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workspace>>> GetWorkspaces(
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
            return Ok(workspaces);
        }

        [HttpPost]
        public async Task<ActionResult<Workspace>> CreateWorkspace(
            [FromBody] CreateWorkspaceRequest request
        )
        {
            if (string.IsNullOrEmpty(request?.Name) || request.TenantId == Guid.Empty)
            {
                return BadRequest("Name and TenantId are required");
            }

            var workspace = new Workspace { Name = request.Name, TenantId = request.TenantId };

            var createdWorkspace = await _workspaceService.CreateAsync(workspace);
            return CreatedAtAction(
                nameof(GetWorkspace),
                new { id = createdWorkspace.Id },
                createdWorkspace
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workspace>> GetWorkspace(Guid id)
        {
            var workspace = await _workspaceService.GetByIdAsync(id);
            if (workspace == null)
            {
                return NotFound();
            }
            return Ok(workspace);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Workspace>> UpdateWorkspace(
            Guid id,
            [FromBody] Workspace workspace
        )
        {
            if (id != workspace.Id)
            {
                return BadRequest("ID mismatch");
            }

            var updatedWorkspace = await _workspaceService.UpdateAsync(workspace);
            return Ok(updatedWorkspace);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkspace(Guid id)
        {
            await _workspaceService.DeleteAsync(id);
            return NoContent();
        }
    }
}
