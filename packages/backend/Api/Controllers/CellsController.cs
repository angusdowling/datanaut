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
    [Route("cells")]
    [Authorize]
    public class CellsController : ControllerBase
    {
        private readonly IService<AppCell> _cellService;
        private readonly IMapper _mapper;

        public CellsController(IService<AppCell> cellService, IMapper mapper)
        {
            _cellService = cellService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CellDto>>> GetCells([FromQuery] Guid rowId)
        {
            var cells = await _cellService.FindAsync(c => c.RowId == rowId);
            return Ok(_mapper.Map<IEnumerable<CellDto>>(cells));
        }

        [HttpPost]
        public async Task<ActionResult<CellDto>> CreateCell([FromBody] CreateCellDto request)
        {
            if (request.RowId == Guid.Empty || request.ColumnId == Guid.Empty)
            {
                return BadRequest("RowId and ColumnId are required");
            }

            var cell = _mapper.Map<AppCell>(request);
            var createdCell = await _cellService.CreateAsync(cell);
            return CreatedAtAction(
                nameof(GetCell),
                new { id = createdCell.Id },
                _mapper.Map<CellDto>(createdCell)
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CellDto>> GetCell(Guid id)
        {
            var cell = await _cellService.GetByIdAsync(id);
            if (cell == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CellDto>(cell));
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<CellDto>> UpdateCell(
            Guid id,
            [FromBody] UpdateCellDto request
        )
        {
            var existingCell = await _cellService.GetByIdAsync(id);
            if (existingCell == null)
            {
                return NotFound();
            }

            _mapper.Map(request, existingCell);
            var updatedCell = await _cellService.UpdateAsync(existingCell);
            return Ok(_mapper.Map<CellDto>(updatedCell));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCell(Guid id)
        {
            await _cellService.DeleteAsync(id);
            return NoContent();
        }
    }
}
