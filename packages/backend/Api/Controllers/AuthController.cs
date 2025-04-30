using System.Threading.Tasks;
using Datanaut.Api.Models;
using Datanaut.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Datanaut.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        private readonly IAuthService _authService = authService;

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.RequestLoginCode(request.Email);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("verify")]
        public async Task<ActionResult<AuthResponse>> Verify([FromBody] VerifyRequest request)
        {
            var response = await _authService.VerifyLoginCode(request.Email, request.Code);
            if (string.IsNullOrEmpty(response.Token))
            {
                return Unauthorized(response);
            }
            return Ok(response);
        }
    }
}
