using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Services
{
    public class RowService(
        IRepository<AppRow> rowRepository,
        IRepository<AppColumn> columnRepository,
        IRepository<AppCell> cellRepository,
        ApplicationDbContext context
    ) : IService<AppRow>
    {
        private readonly IRepository<AppRow> _rowRepository = rowRepository;
        private readonly IRepository<AppColumn> _columnRepository = columnRepository;
        private readonly IRepository<AppCell> _cellRepository = cellRepository;
        private readonly ApplicationDbContext _context = context;

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
            var createdRow = await _rowRepository.CreateAsync(row);

            // Get all columns for this table
            var columns = await _columnRepository.FindAsync(c => c.TableId == row.TableId);

            // Create a cell for each column
            foreach (var column in columns)
            {
                var cell = new AppCell
                {
                    RowId = createdRow.Id,
                    ColumnId = column.Id,
                    Value = "{}",
                };
                await _cellRepository.CreateAsync(cell);
            }

            return createdRow;
        }

        public async Task<AppRow> UpdateAsync(AppRow row)
        {
            // Update any modified cells
            foreach (var cell in row.AppCells)
            {
                if (_context.Entry(cell).State == EntityState.Modified)
                {
                    await _cellRepository.UpdateAsync(cell);
                }
            }

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
