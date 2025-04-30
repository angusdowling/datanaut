using System.Linq.Expressions;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public interface IRefreshTokenService : IServiceMarker
    {
        Task<IEnumerable<RefreshToken>> GetAllAsync();
        Task<RefreshToken?> GetByIdAsync(Guid id);
        Task<RefreshToken> CreateAsync(RefreshToken entity);
        Task<RefreshToken> UpdateAsync(RefreshToken entity);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<RefreshToken>> FindAsync(Expression<Func<RefreshToken, bool>> predicate);
        Task<RefreshToken?> GetByTokenAsync(string token);
        Task RevokeDescendantsAsync(RefreshToken token, string reason);
    }
}
