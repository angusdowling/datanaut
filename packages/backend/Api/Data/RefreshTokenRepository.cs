using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly ApplicationDbContext _context;

        public RefreshTokenRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RefreshToken>> GetAllAsync()
        {
            return await _context.RefreshTokens.ToListAsync();
        }

        public async Task<RefreshToken?> GetByIdAsync(Guid id)
        {
            return await _context.RefreshTokens.FindAsync(id);
        }

        public async Task<RefreshToken> CreateAsync(RefreshToken token)
        {
            _context.RefreshTokens.Add(token);
            await _context.SaveChangesAsync();
            return token;
        }

        public async Task<RefreshToken> UpdateAsync(RefreshToken token)
        {
            _context.RefreshTokens.Update(token);
            await _context.SaveChangesAsync();
            return token;
        }

        public async Task DeleteAsync(Guid id)
        {
            var token = await _context.RefreshTokens.FindAsync(id);
            if (token != null)
            {
                _context.RefreshTokens.Remove(token);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<RefreshToken>> FindAsync(
            Expression<Func<RefreshToken, bool>> predicate
        )
        {
            return await _context.RefreshTokens.Where(predicate).ToListAsync();
        }

        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _context
                .RefreshTokens.Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == token);
        }

        public async Task RevokeDescendantsAsync(RefreshToken token, string reason)
        {
            var descendants = await _context
                .RefreshTokens.Where(rt => rt.ReplacedByToken == token.Token)
                .ToListAsync();

            foreach (var descendant in descendants)
            {
                descendant.Revoked = true;
                descendant.RevokedAt = DateTime.UtcNow;
                descendant.ReasonRevoked = reason;
            }

            await _context.SaveChangesAsync();
        }
    }
}
