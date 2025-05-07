using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class TableService(IRepository<AppTable> tableRepository) : IService<AppTable>
    {
        private readonly IRepository<AppTable> _tableRepository = tableRepository;

        public async Task<IEnumerable<AppTable>> GetAllAsync()
        {
            return await _tableRepository.GetAllAsync();
        }

        public async Task<AppTable?> GetByIdAsync(Guid id)
        {
            return await _tableRepository.GetByIdAsync(id);
        }

        public async Task<AppTable> CreateAsync(AppTable table)
        {
            return await _tableRepository.CreateAsync(table);
        }

        public async Task<AppTable> UpdateAsync(AppTable table)
        {
            return await _tableRepository.UpdateAsync(table);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _tableRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<AppTable>> FindAsync(
            Expression<Func<AppTable, bool>> predicate
        )
        {
            return await _tableRepository.FindAsync(predicate);
        }
    }
}
