using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class ColumnService(IRepository<AppColumn> columnRepository) : IService<AppColumn>
    {
        private readonly IRepository<AppColumn> _columnRepository = columnRepository;

        public async Task<IEnumerable<AppColumn>> GetAllAsync()
        {
            return await _columnRepository.GetAllAsync();
        }

        public async Task<AppColumn?> GetByIdAsync(Guid id)
        {
            return await _columnRepository.GetByIdAsync(id);
        }

        public async Task<AppColumn> CreateAsync(AppColumn column)
        {
            return await _columnRepository.CreateAsync(column);
        }

        public async Task<AppColumn> UpdateAsync(AppColumn column)
        {
            return await _columnRepository.UpdateAsync(column);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _columnRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<AppColumn>> FindAsync(
            Expression<Func<AppColumn, bool>> predicate
        )
        {
            return await _columnRepository.FindAsync(predicate);
        }
    }
}
