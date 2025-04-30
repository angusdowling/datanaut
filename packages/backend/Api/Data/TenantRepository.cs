using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;
using Microsoft.EntityFrameworkCore;

namespace Datanaut.Api.Data
{
    public class TenantRepository(ApplicationDbContext context) : IRepository<Tenant>
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<Tenant>> GetAllAsync()
        {
            return await _context.Tenants.ToListAsync();
        }

        public async Task<Tenant?> GetByIdAsync(Guid id)
        {
            return await _context.Tenants.FindAsync(id);
        }

        public async Task<Tenant> CreateAsync(Tenant tenant)
        {
            tenant.Id = Guid.NewGuid();
            tenant.CreatedAt = DateTime.UtcNow;
            tenant.UpdatedAt = DateTime.UtcNow;

            _context.Tenants.Add(tenant);
            await _context.SaveChangesAsync();

            return tenant;
        }

        public async Task<Tenant> UpdateAsync(Tenant tenant)
        {
            tenant.UpdatedAt = DateTime.UtcNow;
            _context.Tenants.Update(tenant);
            await _context.SaveChangesAsync();
            return tenant;
        }

        public async Task DeleteAsync(Guid id)
        {
            var tenant = await _context.Tenants.FindAsync(id);
            if (tenant != null)
            {
                _context.Tenants.Remove(tenant);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Tenant>> FindAsync(Expression<Func<Tenant, bool>> predicate)
        {
            return await _context.Tenants.Where(predicate).ToListAsync();
        }
    }
}
