using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class RowService(IRepository<AppRow> rowRepository) : IService<AppRow>
    {
        private readonly IRepository<AppRow> _rowRepository = rowRepository;

        public async Task<IEnumerable<AppRow>> GetAllAsync()
        {
            return await _rowRepository.GetAllAsync();
        }

        public async Task<AppRow?> GetByIdAsync(Guid id)
        {
            return await _rowRepository.GetByIdAsync(id);
        }

        public async Task<AppRow> CreateAsync(AppRow row)
        {
            return await _rowRepository.CreateAsync(row);
        }

        public async Task<AppRow> UpdateAsync(AppRow row)
        {
            return await _rowRepository.UpdateAsync(row);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _rowRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<AppRow>> FindAsync(Expression<Func<AppRow, bool>> predicate)
        {
            return await _rowRepository.FindAsync(predicate);
        }
    }
}
