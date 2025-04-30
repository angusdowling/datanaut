using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Api.Models;
using Datanaut.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Datanaut.Api.Services
{
    public class AuthService(
        IService<User> userService,
        IService<LoginToken> loginTokenService,
        IRefreshTokenRepository refreshTokenService,
        IJwtService jwtService,
        IConfiguration configuration
    ) : IAuthService
    {
        private readonly IService<User> _userService = userService;
        private readonly IService<LoginToken> _loginTokenService = loginTokenService;
        private readonly IRefreshTokenRepository _refreshTokenService = refreshTokenService;
        private readonly IJwtService _jwtService = jwtService;
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
                return new AuthResponse { User = null };
            }

            // Mark token as used
            loginToken.Used = true;
            await _loginTokenService.UpdateAsync(loginToken);

            // Get user
            var users = await _userService.FindAsync(u => u.Email == email);
            var user = users.FirstOrDefault();
            if (user == null)
            {
                return new AuthResponse { User = null };
            }

            // Generate tokens
            var accessToken = await _jwtService.GenerateAccessTokenAsync(user);
            var refreshToken = await _jwtService.GenerateRefreshTokenAsync(user);
            await _refreshTokenService.CreateAsync(refreshToken);

            return new AuthResponse
            {
                User = new UserResponse
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                },
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
            };
        }

        public async Task<AuthResponse> RefreshToken(string refreshToken)
        {
            var token = await _refreshTokenService.GetByTokenAsync(refreshToken);
            if (token == null || token.Revoked || token.ExpiresAt < DateTime.UtcNow)
            {
                return new AuthResponse { User = null };
            }

            // Get user
            var user = await _userService.GetByIdAsync(token.UserId);
            if (user == null)
            {
                return new AuthResponse { User = null };
            }

            // Generate new tokens
            var newAccessToken = await _jwtService.GenerateAccessTokenAsync(user);
            var newRefreshToken = await _jwtService.GenerateRefreshTokenAsync(user);
            newRefreshToken.ReplacedByToken = token.Token;
            await _refreshTokenService.CreateAsync(newRefreshToken);

            return new AuthResponse
            {
                User = new UserResponse
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                },
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken.Token,
            };
        }
    }
}
