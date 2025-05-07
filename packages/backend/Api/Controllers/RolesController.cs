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
    [Route("roles")]
    [Authorize]
    public class RolesController(IService<Role> roleService, IMapper mapper) : ControllerBase
    {
        private readonly IService<Role> _roleService = roleService;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetRoles()
        {
            var roles = await _roleService.GetAllAsync();
            var roleDtos = _mapper.Map<IEnumerable<RoleDto>>(roles);
            return Ok(roleDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDto>> GetRole(Guid id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<RoleDto>(role));
        }

        [HttpPost]
        public async Task<ActionResult<RoleDto>> CreateRole([FromBody] CreateRoleDto request)
        {
            if (string.IsNullOrEmpty(request?.Name) || string.IsNullOrEmpty(request?.Permissions))
            {
                return BadRequest("Name and Permissions are required");
            }

            var role = _mapper.Map<Role>(request);
            var createdRole = await _roleService.CreateAsync(role);
            return CreatedAtAction(
                nameof(GetRole),
                new { id = createdRole.Id },
                _mapper.Map<RoleDto>(createdRole)
            );
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<RoleDto>> UpdateRole(
            Guid id,
            [FromBody] UpdateRoleDto request
        )
        {
            var existingRole = await _roleService.GetByIdAsync(id);
            if (existingRole == null)
            {
                return NotFound();
            }

            _mapper.Map(request, existingRole);
            var updatedRole = await _roleService.UpdateAsync(existingRole);
            return Ok(_mapper.Map<RoleDto>(updatedRole));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(Guid id)
        {
            await _roleService.DeleteAsync(id);
            return NoContent();
        }
    }
}
