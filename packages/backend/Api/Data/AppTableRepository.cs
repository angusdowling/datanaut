using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class AppTableRepository(ApplicationDbContext context) : IRepository<AppTable>
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<AppTable>> GetAllAsync()
        {
            return await _context.AppTables.Include(t => t.Workspace).ToListAsync();
        }

        public async Task<AppTable?> GetByIdAsync(Guid id)
        {
            return await _context
                .AppTables.Include(t => t.Workspace)
                .Include(t => t.AppColumns)
                .Include(t => t.AppRows)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<AppTable> CreateAsync(AppTable table)
        {
            table.Id = Guid.NewGuid();
            table.CreatedAt = DateTime.UtcNow;
            table.UpdatedAt = DateTime.UtcNow;

            _context.AppTables.Add(table);
            await _context.SaveChangesAsync();

            return table;
        }

        public async Task<AppTable> UpdateAsync(AppTable table)
        {
            table.UpdatedAt = DateTime.UtcNow;
            _context.AppTables.Update(table);
            await _context.SaveChangesAsync();

            return table;
        }

        public async Task DeleteAsync(Guid id)
        {
            var table = await _context.AppTables.FindAsync(id);
            if (table != null)
            {
                _context.AppTables.Remove(table);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<AppTable>> FindAsync(
            Expression<Func<AppTable, bool>> predicate
        )
        {
            return await _context
                .AppTables.Include(t => t.Workspace)
                .Include(t => t.AppColumns)
                .Include(t => t.AppRows)
                .Where(predicate)
                .ToListAsync();
        }
    }
}
