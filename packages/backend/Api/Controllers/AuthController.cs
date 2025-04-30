using System.Threading.Tasks;
using Datanaut.Api.Models;
using Datanaut.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Datanaut.Api.Controllers
{
    [ApiController]
    [Route("auth")]
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
            if (response.User == null)
            {
                return Unauthorized(response);
            }

            // Set the JWT in an HTTP-only cookie
            Response.Cookies.Append(
                "__datanaut_access_token",
                response.AccessToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddHours(1),
                }
            );

            // Set the JWT in an HTTP-only cookie
            Response.Cookies.Append(
                "__datanaut_refresh_token",
                response.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddDays(7),
                }
            );

            // Return only the user data, not the token
            return Ok();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok();
        }
    }
}
