using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class AppColumnRepository(ApplicationDbContext context) : IRepository<AppColumn>
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<AppColumn>> GetAllAsync()
        {
            return await _context.AppColumns.ToListAsync();
        }

        public async Task<AppColumn?> GetByIdAsync(Guid id)
        {
            return await _context.AppColumns.FindAsync(id);
        }

        public async Task<AppColumn> CreateAsync(AppColumn column)
        {
            column.Id = Guid.NewGuid();
            column.CreatedAt = DateTime.UtcNow;
            column.UpdatedAt = DateTime.UtcNow;

            _context.AppColumns.Add(column);
            await _context.SaveChangesAsync();

            return column;
        }

        public async Task<AppColumn> UpdateAsync(AppColumn column)
        {
            column.UpdatedAt = DateTime.UtcNow;
            _context.AppColumns.Update(column);
            await _context.SaveChangesAsync();

            return column;
        }

        public async Task DeleteAsync(Guid id)
        {
            var column = await _context.AppColumns.FindAsync(id);
            if (column != null)
            {
                _context.AppColumns.Remove(column);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<AppColumn>> FindAsync(
            Expression<Func<AppColumn, bool>> predicate
        )
        {
            return await _context.AppColumns.Where(predicate).ToListAsync();
        }
    }
}
