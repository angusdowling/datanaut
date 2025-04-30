using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Api.Models;

namespace Datanaut.Api.Services
{
    public interface IAuthService : IServiceMarker
    {
        Task<LoginResponse> RequestLoginCode(string email);
        Task<AuthResponse> VerifyLoginCode(string email, string code);
    }
}
