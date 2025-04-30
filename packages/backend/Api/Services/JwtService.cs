using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Datanaut.Models;
using Microsoft.IdentityModel.Tokens;

namespace Datanaut.Api.Services
{
    public interface IJwtService
    {
        Task<string> GenerateAccessTokenAsync(User user);
        Task<RefreshToken> GenerateRefreshTokenAsync(User user);
        Task<bool> ValidateTokenAsync(string token);
        Task<RefreshToken?> GetRefreshTokenByTokenAsync(string token);
        Task RevokeRefreshTokenAsync(RefreshToken token, string reason = null!);
    }

    public class JwtService(IConfiguration configuration) : IJwtService
    {
        private readonly string _secretKey =
            configuration["Jwt:SecretKey"] ?? throw new ArgumentNullException("Jwt:SecretKey");
        private readonly string _issuer =
            configuration["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer");
        private readonly string _audience =
            configuration["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience");
        private readonly int _refreshTokenTTL = int.Parse(
            configuration["Jwt:RefreshTokenTTL"] ?? "7"
        );

        public Task<string> GenerateAccessTokenAsync(User user)
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
                expires: DateTime.UtcNow.AddMinutes(15), // Short-lived access token
                signingCredentials: credentials
            );

            return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
        }

        public Task<RefreshToken> GenerateRefreshTokenAsync(User user)
        {
            var refreshToken = new RefreshToken
            {
                UserId = user.Id,
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                ExpiresAt = DateTime.UtcNow.AddDays(_refreshTokenTTL),
                CreatedAt = DateTime.UtcNow,
            };

            return Task.FromResult(refreshToken);
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

        public Task<RefreshToken?> GetRefreshTokenByTokenAsync(string token)
        {
            // This will be implemented in the repository layer
            throw new NotImplementedException();
        }

        public Task RevokeRefreshTokenAsync(RefreshToken token, string reason = null!)
        {
            token.Revoked = true;
            token.RevokedAt = DateTime.UtcNow;
            token.ReasonRevoked = reason ?? "Revoked without reason";

            return Task.CompletedTask;
        }
    }
}
