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
    [Route("api/[controller]")]
    [Authorize]
    public class TablesController(IService<AppTable> tableService) : ControllerBase
    {
        private readonly IService<AppTable> _tableService = tableService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppTable>>> GetTables(
            [FromQuery] Guid workspaceId
        )
        {
            var tables = await _tableService.FindAsync(t => t.WorkspaceId == workspaceId);
            return Ok(tables);
        }

        [HttpPost]
        public async Task<ActionResult<AppTable>> CreateTable([FromBody] CreateTableRequest request)
        {
            if (string.IsNullOrEmpty(request?.Name) || request.WorkspaceId == Guid.Empty)
            {
                return BadRequest("Name and WorkspaceId are required");
            }

            var table = new AppTable { Name = request.Name, WorkspaceId = request.WorkspaceId };

            var createdTable = await _tableService.CreateAsync(table);
            return CreatedAtAction(nameof(GetTable), new { id = createdTable.Id }, createdTable);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppTable>> GetTable(Guid id)
        {
            var table = await _tableService.GetByIdAsync(id);
            if (table == null)
            {
                return NotFound();
            }
            return Ok(table);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppTable>> UpdateTable(Guid id, [FromBody] AppTable table)
        {
            if (id != table.Id)
            {
                return BadRequest("ID mismatch");
            }

            var updatedTable = await _tableService.UpdateAsync(table);
            return Ok(updatedTable);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable(Guid id)
        {
            await _tableService.DeleteAsync(id);
            return NoContent();
        }
    }
}
