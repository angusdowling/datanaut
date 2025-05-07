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
    [Route("tenants")]
    [Authorize]
    public class TenantsController(IService<Tenant> tenantService) : ControllerBase
    {
        private readonly IService<Tenant> _tenantService = tenantService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tenant>>> GetTenants()
        {
            var tenants = await _tenantService.GetAllAsync();
            return Ok(tenants);
        }

        [HttpPost]
        public async Task<ActionResult<Tenant>> CreateTenant([FromBody] CreateTenantRequest request)
        {
            if (string.IsNullOrEmpty(request?.Name))
            {
                return BadRequest("Name is required");
            }

            var tenant = new Tenant { Name = request.Name };
            var createdTenant = await _tenantService.CreateAsync(tenant);
            return CreatedAtAction(nameof(GetTenant), new { id = createdTenant.Id }, createdTenant);
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

        [HttpPatch("{id}")]
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
