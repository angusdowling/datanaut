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
    [Route("users")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IService<User> _userService;
        private readonly IMapper _mapper;

        public UsersController(IService<User> userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userService.GetAllAsync();
            var userDtos = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto request)
        {
            if (string.IsNullOrEmpty(request?.Email) || string.IsNullOrEmpty(request?.Name))
            {
                return BadRequest("Email and Name are required");
            }

            var user = _mapper.Map<User>(request);
            var createdUser = await _userService.CreateAsync(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { id = createdUser.Id },
                _mapper.Map<UserDto>(createdUser)
            );
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<UserDto>> UpdateUser(
            Guid id,
            [FromBody] UpdateUserDto request
        )
        {
            var existingUser = await _userService.GetByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            _mapper.Map(request, existingUser);
            var updatedUser = await _userService.UpdateAsync(existingUser);
            return Ok(_mapper.Map<UserDto>(updatedUser));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _userService.DeleteAsync(id);
            return NoContent();
        }
    }
}
