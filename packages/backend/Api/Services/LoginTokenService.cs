using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class LoginTokenService : IService<LoginToken>
    {
        private readonly IRepository<LoginToken> _loginTokenRepository;

        public LoginTokenService(IRepository<LoginToken> loginTokenRepository)
        {
            _loginTokenRepository = loginTokenRepository;
        }

        public async Task<IEnumerable<LoginToken>> GetAllAsync()
        {
            return await _loginTokenRepository.GetAllAsync();
        }

        public async Task<LoginToken?> GetByIdAsync(Guid id)
        {
            return await _loginTokenRepository.GetByIdAsync(id);
        }

        public async Task<LoginToken> CreateAsync(LoginToken token)
        {
            return await _loginTokenRepository.CreateAsync(token);
        }

        public async Task<LoginToken> UpdateAsync(LoginToken token)
        {
            return await _loginTokenRepository.UpdateAsync(token);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _loginTokenRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<LoginToken>> FindAsync(
            Expression<Func<LoginToken, bool>> predicate
        )
        {
            return await _loginTokenRepository.FindAsync(predicate);
        }
    }
}
