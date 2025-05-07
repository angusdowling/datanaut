using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class CellService(IRepository<AppCell> cellRepository) : IService<AppCell>
    {
        private readonly IRepository<AppCell> _cellRepository = cellRepository;

        public async Task<IEnumerable<AppCell>> GetAllAsync()
        {
            return await _cellRepository.GetAllAsync();
        }

        public async Task<AppCell?> GetByIdAsync(Guid id)
        {
            return await _cellRepository.GetByIdAsync(id);
        }

        public async Task<AppCell> CreateAsync(AppCell cell)
        {
            return await _cellRepository.CreateAsync(cell);
        }

        public async Task<AppCell> UpdateAsync(AppCell cell)
        {
            return await _cellRepository.UpdateAsync(cell);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _cellRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<AppCell>> FindAsync(Expression<Func<AppCell, bool>> predicate)
        {
            return await _cellRepository.FindAsync(predicate);
        }

        // Additional methods specific to CellService
        public async Task<IEnumerable<AppCell>> GetCellsByRowAsync(Guid rowId)
        {
            return await _cellRepository.FindAsync(c => c.RowId == rowId);
        }
    }
}
