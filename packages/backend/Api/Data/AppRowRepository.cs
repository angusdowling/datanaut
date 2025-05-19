using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class AppRowRepository(ApplicationDbContext context) : IRepository<AppRow>
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<AppRow>> GetAllAsync()
        {
            return await _context
                .AppRows.Include(r => r.AppCells)
                .ThenInclude(c => c.Column)
                .OrderBy(r => r.Position)
                .ToListAsync();
        }

        public async Task<AppRow?> GetByIdAsync(Guid id)
        {
            return await _context
                .AppRows.Include(r => r.AppCells)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<AppRow> CreateAsync(AppRow row)
        {
            row.Id = Guid.NewGuid();
            row.CreatedAt = DateTime.UtcNow;
            row.UpdatedAt = DateTime.UtcNow;

            _context.AppRows.Add(row);
            await _context.SaveChangesAsync();

            return row;
        }

        public async Task<AppRow> UpdateAsync(AppRow row)
        {
            row.UpdatedAt = DateTime.UtcNow;
            _context.AppRows.Update(row);
            await _context.SaveChangesAsync();

            return row;
        }

        public async Task DeleteAsync(Guid id)
        {
            var row = await _context.AppRows.FindAsync(id);
            if (row != null)
            {
                _context.AppRows.Remove(row);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<AppRow>> FindAsync(Expression<Func<AppRow, bool>> predicate)
        {
            return await _context
                .AppRows.Where(predicate)
                .Include(r => r.AppCells)
                .ThenInclude(c => c.Column)
                .OrderBy(r => r.Position)
                .ToListAsync();
        }
    }
}
