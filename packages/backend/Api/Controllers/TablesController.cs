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
    [Route("tables")]
    [Authorize]
    public class TablesController(IService<AppTable> tableService, IMapper mapper) : ControllerBase
    {
        private readonly IService<AppTable> _tableService = tableService;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableDto>>> GetTables(
            [FromQuery] Guid workspaceId
        )
        {
            var tables = await _tableService.FindAsync(t => t.WorkspaceId == workspaceId);
            return Ok(_mapper.Map<IEnumerable<TableDto>>(tables));
        }

        [HttpPost]
        public async Task<ActionResult<TableDto>> CreateTable([FromBody] CreateTableDto request)
        {
            if (string.IsNullOrEmpty(request?.Name) || request.WorkspaceId == Guid.Empty)
            {
                return BadRequest("Name and WorkspaceId are required");
            }

            var table = _mapper.Map<AppTable>(request);
            var createdTable = await _tableService.CreateAsync(table);
            return CreatedAtAction(
                nameof(GetTable),
                new { id = createdTable.Id },
                _mapper.Map<TableDto>(createdTable)
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TableDto>> GetTable(Guid id)
        {
            var table = await _tableService.GetByIdAsync(id);
            if (table == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TableDto>(table));
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<TableDto>> UpdateTable(
            Guid id,
            [FromBody] UpdateTableDto request
        )
        {
            var existingTable = await _tableService.GetByIdAsync(id);
            if (existingTable == null)
            {
                return NotFound();
            }

            _mapper.Map(request, existingTable);
            var updatedTable = await _tableService.UpdateAsync(existingTable);
            return Ok(_mapper.Map<TableDto>(updatedTable));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable(Guid id)
        {
            await _tableService.DeleteAsync(id);
            return NoContent();
        }
    }
}
