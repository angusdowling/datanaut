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
    public class TenantsController(TenantService tenantService) : ControllerBase
    {
        private readonly TenantService _tenantService = tenantService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tenant>>> GetTenants()
        {
            var tenants = await _tenantService.GetTenantsAsync();
            return Ok(tenants);
        }

        [HttpPost]
        public async Task<ActionResult<Tenant>> CreateTenant([FromBody] CreateTenantRequest request)
        {
            if (string.IsNullOrEmpty(request?.Name))
            {
                return BadRequest("Name is required");
            }

            var tenant = await _tenantService.CreateTenantAsync(request);
            return CreatedAtAction(nameof(GetTenant), new { id = tenant.Id }, tenant);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tenant>> GetTenant(Guid id)
        {
            var tenant = await _tenantService.GetByIdAsync(id);
            if (tenant == null)
            {
                return NotFound();
            }
            return Ok(tenant);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Tenant>> UpdateTenant(Guid id, [FromBody] Tenant tenant)
        {
            if (id != tenant.Id)
            {
                return BadRequest("ID mismatch");
            }

            var updatedTenant = await _tenantService.UpdateAsync(tenant);
            return Ok(updatedTenant);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTenant(Guid id)
        {
            await _tenantService.DeleteAsync(id);
            return NoContent();
        }
    }
}
