using System.Linq.Expressions;
using Datanaut.Models;

namespace Datanaut.Api.Data
{
    public interface IRefreshTokenRepository : IRepositoryMarker
    {
        Task<IEnumerable<RefreshToken>> GetAllAsync();
        Task<RefreshToken?> GetByIdAsync(Guid id);
        Task<RefreshToken> CreateAsync(RefreshToken entity);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<RefreshToken>> FindAsync(Expression<Func<RefreshToken, bool>> predicate);
        Task<RefreshToken> UpdateAsync(RefreshToken entity);
        Task<RefreshToken?> GetByTokenAsync(string token);
        Task RevokeDescendantsAsync(RefreshToken token, string reason);
    }
}
