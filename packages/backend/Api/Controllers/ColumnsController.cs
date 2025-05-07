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
    [Route("columns")]
    [Authorize]
    public class ColumnsController : ControllerBase
    {
        private readonly IService<AppColumn> _columnService;
        private readonly IMapper _mapper;

        public ColumnsController(IService<AppColumn> columnService, IMapper mapper)
        {
            _columnService = columnService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ColumnDto>>> GetColumns([FromQuery] Guid tableId)
        {
            var columns = await _columnService.FindAsync(c => c.TableId == tableId);
            return Ok(_mapper.Map<IEnumerable<ColumnDto>>(columns));
        }

        [HttpPost]
        public async Task<ActionResult<ColumnDto>> CreateColumn([FromBody] CreateColumnDto request)
        {
            if (
                string.IsNullOrEmpty(request?.Name)
                || string.IsNullOrEmpty(request?.Type)
                || request.TableId == Guid.Empty
            )
            {
                return BadRequest("Name, Type, and TableId are required");
            }

            var column = _mapper.Map<AppColumn>(request);
            var createdColumn = await _columnService.CreateAsync(column);
            return CreatedAtAction(
                nameof(GetColumn),
                new { id = createdColumn.Id },
                _mapper.Map<ColumnDto>(createdColumn)
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ColumnDto>> GetColumn(Guid id)
        {
            var column = await _columnService.GetByIdAsync(id);
            if (column == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ColumnDto>(column));
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<ColumnDto>> UpdateColumn(
            Guid id,
            [FromBody] UpdateColumnDto request
        )
        {
            var existingColumn = await _columnService.GetByIdAsync(id);
            if (existingColumn == null)
            {
                return NotFound();
            }

            _mapper.Map(request, existingColumn);
            var updatedColumn = await _columnService.UpdateAsync(existingColumn);
            return Ok(_mapper.Map<ColumnDto>(updatedColumn));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColumn(Guid id)
        {
            await _columnService.DeleteAsync(id);
            return NoContent();
        }
    }
}
