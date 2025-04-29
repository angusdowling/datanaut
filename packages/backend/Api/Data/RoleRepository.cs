using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class RoleRepository : IRepository<Role>
    {
        private readonly ApplicationDbContext _context;

        public RoleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role?> GetByIdAsync(Guid id)
        {
            return await _context.Roles.FindAsync(id);
        }

        public async Task<Role> CreateAsync(Role role)
        {
            role.Id = Guid.NewGuid();
            role.CreatedAt = DateTime.UtcNow;
            role.UpdatedAt = DateTime.UtcNow;

            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return role;
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            role.UpdatedAt = DateTime.UtcNow;
            _context.Roles.Update(role);
            await _context.SaveChangesAsync();

            return role;
        }

        public async Task DeleteAsync(Guid id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role != null)
            {
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Role>> FindAsync(Expression<Func<Role, bool>> predicate)
        {
            return await _context.Roles.Where(predicate).ToListAsync();
        }
    }
}
