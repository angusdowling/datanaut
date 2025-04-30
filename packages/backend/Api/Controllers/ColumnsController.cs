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
    public class ColumnsController(IService<AppColumn> columnService) : ControllerBase
    {
        private readonly IService<AppColumn> _columnService = columnService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppColumn>>> GetColumns([FromQuery] Guid tableId)
        {
            var columns = await _columnService.FindAsync(c => c.TableId == tableId);
            return Ok(columns);
        }

        [HttpPost]
        public async Task<ActionResult<AppColumn>> CreateColumn(
            [FromBody] CreateColumnRequest request
        )
        {
            if (
                string.IsNullOrEmpty(request?.Name)
                || string.IsNullOrEmpty(request?.Type)
                || request.TableId == Guid.Empty
            )
            {
                return BadRequest("Name, Type, and TableId are required");
            }

            var column = new AppColumn
            {
                Name = request.Name,
                Type = request.Type,
                TableId = request.TableId,
                Position = request.Position,
                IsRequired = request.IsRequired,
                Config = request.Config,
                Options = request.Options,
            };

            var createdColumn = await _columnService.CreateAsync(column);
            return CreatedAtAction(nameof(GetColumn), new { id = createdColumn.Id }, createdColumn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppColumn>> GetColumn(Guid id)
        {
            var column = await _columnService.GetByIdAsync(id);
            if (column == null)
            {
                return NotFound();
            }
            return Ok(column);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppColumn>> UpdateColumn(
            Guid id,
            [FromBody] AppColumn column
        )
        {
            if (id != column.Id)
            {
                return BadRequest("ID mismatch");
            }

            var updatedColumn = await _columnService.UpdateAsync(column);
            return Ok(updatedColumn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColumn(Guid id)
        {
            await _columnService.DeleteAsync(id);
            return NoContent();
        }
    }
}
