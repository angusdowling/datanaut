using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class WorkspaceRepository(ApplicationDbContext context) : IRepository<Workspace>
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<Workspace>> GetAllAsync()
        {
            return await _context.Workspaces.Include(w => w.Tenant).ToListAsync();
        }

        public async Task<Workspace?> GetByIdAsync(Guid id)
        {
            return await _context.Workspaces.FindAsync(id);
        }

        public async Task<Workspace> CreateAsync(Workspace workspace)
        {
            workspace.Id = Guid.NewGuid();
            workspace.CreatedAt = DateTime.UtcNow;
            workspace.UpdatedAt = DateTime.UtcNow;

            _context.Workspaces.Add(workspace);
            await _context.SaveChangesAsync();

            return workspace;
        }

        public async Task<Workspace> UpdateAsync(Workspace workspace)
        {
            workspace.UpdatedAt = DateTime.UtcNow;
            _context.Workspaces.Update(workspace);
            await _context.SaveChangesAsync();

            return workspace;
        }

        public async Task DeleteAsync(Guid id)
        {
            var workspace = await _context.Workspaces.FindAsync(id);
            if (workspace != null)
            {
                _context.Workspaces.Remove(workspace);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Workspace>> FindAsync(
            Expression<Func<Workspace, bool>> predicate
        )
        {
            return await _context.Workspaces.Where(predicate).Include(w => w.Tenant).ToListAsync();
        }
    }
}
