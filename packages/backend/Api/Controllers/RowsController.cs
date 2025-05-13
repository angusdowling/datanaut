using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("rows")]
    [Authorize]
    public class RowsController(IService<AppRow> rowService, IMapper mapper) : ControllerBase
    {
        private readonly IService<AppRow> _rowService = rowService;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RowDto>>> GetRows([FromQuery] Guid tableId)
        {
            var rows = await _rowService.FindAsync(r => r.TableId == tableId);
            return Ok(_mapper.Map<IEnumerable<RowDto>>(rows));
        }

        [HttpPost]
        public async Task<ActionResult<RowDto>> CreateRow([FromBody] CreateRowDto request)
        {
            if (request.TableId == Guid.Empty)
            {
                return BadRequest("TableId is required");
            }

            var row = _mapper.Map<AppRow>(request);
            var createdRow = await _rowService.CreateAsync(row);
            return CreatedAtAction(
                nameof(GetRow),
                new { id = createdRow.Id },
                _mapper.Map<RowDto>(createdRow)
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RowDto>> GetRow(Guid id)
        {
            var row = await _rowService.GetByIdAsync(id);
            if (row == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<RowDto>(row));
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<RowDto>> UpdateRow(Guid id, [FromBody] UpdateRowDto request)
        {
            var existingRow = await _rowService.GetByIdAsync(id);
            if (existingRow == null)
            {
                return NotFound();
            }

            if (request.Cells != null)
            {
                foreach (var cellUpdate in request.Cells)
                {
                    var existingCell = existingRow.AppCells.FirstOrDefault(c =>
                        c.Id == cellUpdate.Id
                    );
                    if (existingCell != null)
                    {
                        _mapper.Map(cellUpdate, existingCell);
                    }
                }
            }

            var updatedRow = await _rowService.UpdateAsync(existingRow);
            return Ok(_mapper.Map<RowDto>(updatedRow));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRow(Guid id)
        {
            await _rowService.DeleteAsync(id);
            return NoContent();
        }
    }
}
