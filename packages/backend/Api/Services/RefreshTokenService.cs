using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public RefreshTokenService(IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<IEnumerable<RefreshToken>> GetAllAsync()
        {
            return await _refreshTokenRepository.GetAllAsync();
        }

        public async Task<RefreshToken?> GetByIdAsync(Guid id)
        {
            return await _refreshTokenRepository.GetByIdAsync(id);
        }

        public async Task<RefreshToken> CreateAsync(RefreshToken token)
        {
            return await _refreshTokenRepository.CreateAsync(token);
        }

        public async Task<RefreshToken> UpdateAsync(RefreshToken token)
        {
            return await _refreshTokenRepository.UpdateAsync(token);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _refreshTokenRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<RefreshToken>> FindAsync(
            Expression<Func<RefreshToken, bool>> predicate
        )
        {
            return await _refreshTokenRepository.FindAsync(predicate);
        }

        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _refreshTokenRepository.GetByTokenAsync(token);
        }

        public async Task RevokeDescendantsAsync(RefreshToken token, string reason)
        {
            await _refreshTokenRepository.RevokeDescendantsAsync(token, reason);
        }
    }
}
