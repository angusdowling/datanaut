using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class LoginTokenRepository : IRepository<LoginToken>
    {
        private readonly ApplicationDbContext _context;

        public LoginTokenRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LoginToken>> GetAllAsync()
        {
            return await _context.LoginTokens.ToListAsync();
        }

        public async Task<LoginToken?> GetByIdAsync(Guid id)
        {
            return await _context.LoginTokens.FindAsync(id);
        }

        public async Task<LoginToken> CreateAsync(LoginToken token)
        {
            token.Id = Guid.NewGuid();
            token.CreatedAt = DateTime.UtcNow;

            _context.LoginTokens.Add(token);
            await _context.SaveChangesAsync();

            return token;
        }

        public async Task<LoginToken> UpdateAsync(LoginToken token)
        {
            _context.LoginTokens.Update(token);
            await _context.SaveChangesAsync();
            return token;
        }

        public async Task DeleteAsync(Guid id)
        {
            var token = await _context.LoginTokens.FindAsync(id);
            if (token != null)
            {
                _context.LoginTokens.Remove(token);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<LoginToken>> FindAsync(
            Expression<Func<LoginToken, bool>> predicate
        )
        {
            return await _context.LoginTokens.Where(predicate).ToListAsync();
        }
    }
}
