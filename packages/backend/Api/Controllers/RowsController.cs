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
    public class RowsController : ControllerBase
    {
        private readonly IService<AppRow> _rowService;

        public RowsController(IService<AppRow> rowService)
        {
            _rowService = rowService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppRow>>> GetRows([FromQuery] Guid tableId)
        {
            var rows = await _rowService.FindAsync(r => r.TableId == tableId);
            return Ok(rows);
        }

        [HttpPost]
        public async Task<ActionResult<AppRow>> CreateRow([FromBody] CreateRowRequest request)
        {
            if (string.IsNullOrEmpty(request?.Data) || request.TableId == Guid.Empty)
            {
                return BadRequest("Data and TableId are required");
            }

            var row = new AppRow { Data = request.Data, TableId = request.TableId };

            var createdRow = await _rowService.CreateAsync(row);
            return CreatedAtAction(nameof(GetRow), new { id = createdRow.Id }, createdRow);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppRow>> GetRow(Guid id)
        {
            var row = await _rowService.GetByIdAsync(id);
            if (row == null)
            {
                return NotFound();
            }
            return Ok(row);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppRow>> UpdateRow(Guid id, [FromBody] AppRow row)
        {
            if (id != row.Id)
            {
                return BadRequest("ID mismatch");
            }

            var updatedRow = await _rowService.UpdateAsync(row);
            return Ok(updatedRow);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRow(Guid id)
        {
            await _rowService.DeleteAsync(id);
            return NoContent();
        }
    }
}
