using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Datanaut.Api.Models;
using Datanaut.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Datanaut.Api.Services
{
    public class AuthService(
        IService<User> userService,
        IService<LoginToken> loginTokenService,
        IConfiguration configuration
    ) : IAuthService
    {
        private readonly IService<User> _userService = userService;
        private readonly IService<LoginToken> _loginTokenService = loginTokenService;
        private readonly IConfiguration _configuration = configuration;

        public async Task<LoginResponse> RequestLoginCode(string email)
        {
            var users = await _userService.FindAsync(u => u.Email == email);
            var user = users.FirstOrDefault();
            if (user == null)
            {
                return new LoginResponse { Success = false, Error = "User not found" };
            }

            // Generate a 6-digit code
            var code = new Random().Next(100000, 999999).ToString();
            var expiresAt = DateTime.UtcNow.AddMinutes(15);

            // Create login token
            var loginToken = new LoginToken
            {
                Email = email,
                Code = code,
                ExpiresAt = expiresAt,
                Used = false,
            };

            await _loginTokenService.CreateAsync(loginToken);

            // TODO: Send email with code
            Console.WriteLine($"Login code for {email}: {code}");

            return new LoginResponse
            {
                Success = true,
                UserId = user.Id,
                TenantId = user.TenantId,
                RoleId = user.RoleId,
            };
        }

        public async Task<AuthResponse> VerifyLoginCode(string email, string code)
        {
            var tokens = await _loginTokenService.FindAsync(t =>
                t.Email == email
                && t.Code == code
                && t.Used == false
                && t.ExpiresAt > DateTime.UtcNow
            );
            var loginToken = tokens.FirstOrDefault();

            if (loginToken == null)
            {
                return new AuthResponse { Token = string.Empty };
            }

            // Mark token as used
            loginToken.Used = true;
            await _loginTokenService.UpdateAsync(loginToken);

            // Get user
            var users = await _userService.FindAsync(u => u.Email == email);
            var user = users.FirstOrDefault();
            if (user == null)
            {
                return new AuthResponse { Token = string.Empty };
            }

            // Generate JWT token
            var token = GenerateJwtToken(user);
            return new AuthResponse { Token = token };
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY")!)
            );
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, user.RoleId.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
