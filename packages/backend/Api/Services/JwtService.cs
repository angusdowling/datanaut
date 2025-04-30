using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Datanaut.Models;
using Microsoft.IdentityModel.Tokens;

namespace Datanaut.Api.Services
{
    public interface IJwtService
    {
        Task<string> GenerateTokenAsync(User user);
        Task<bool> ValidateTokenAsync(string token);
    }

    public class JwtService(IConfiguration configuration) : IJwtService
    {
        private readonly string _secretKey =
            configuration["Jwt:SecretKey"] ?? throw new ArgumentNullException("Jwt:SecretKey");
        private readonly string _issuer =
            configuration["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer");
        private readonly string _audience =
            configuration["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience");

        public Task<string> GenerateTokenAsync(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("tenant_id", user.TenantId.ToString()),
                new Claim("role_id", user.RoleId.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: credentials
            );

            return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
        }

        public Task<bool> ValidateTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secretKey);

                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _issuer,
                    ValidateAudience = true,
                    ValidAudience = _audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                };

                tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
                return Task.FromResult(true);
            }
            catch
            {
                return Task.FromResult(false);
            }
        }
    }
}
