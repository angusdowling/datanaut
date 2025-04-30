namespace Datanaut.Api.Models
{
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public Guid TenantId { get; set; }
        public Guid RoleId { get; set; }
    }

    public class UserResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }

    public class AuthResponse
    {
        public UserResponse? User { get; set; }
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }

    public class VerifyRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public bool Success { get; set; }
        public string? Error { get; set; }
        public Guid UserId { get; set; }
        public Guid TenantId { get; set; }
        public Guid RoleId { get; set; }
    }
}
