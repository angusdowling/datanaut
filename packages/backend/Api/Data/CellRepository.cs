using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class CellRepository(ApplicationDbContext context) : IRepository<AppCell>
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<AppCell>> GetAllAsync()
        {
            return await _context.AppCells.Include(c => c.Column).ToListAsync();
        }

        public async Task<AppCell?> GetByIdAsync(Guid id)
        {
            return await _context.AppCells.FindAsync(id);
        }

        public async Task<AppCell> CreateAsync(AppCell cell)
        {
            cell.Id = Guid.NewGuid();
            cell.CreatedAt = DateTime.UtcNow;
            cell.UpdatedAt = DateTime.UtcNow;

            _context.AppCells.Add(cell);
            await _context.SaveChangesAsync();

            return cell;
        }

        public async Task<AppCell> UpdateAsync(AppCell cell)
        {
            cell.UpdatedAt = DateTime.UtcNow;
            _context.AppCells.Update(cell);
            await _context.SaveChangesAsync();

            return cell;
        }

        public async Task DeleteAsync(Guid id)
        {
            var cell = await _context.AppCells.FindAsync(id);
            if (cell != null)
            {
                _context.AppCells.Remove(cell);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<AppCell>> FindAsync(Expression<Func<AppCell, bool>> predicate)
        {
            return await _context.AppCells.Where(predicate).Include(c => c.Column).ToListAsync();
        }
    }
}
