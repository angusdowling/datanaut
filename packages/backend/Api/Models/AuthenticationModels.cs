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

    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
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
