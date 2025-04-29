using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Api.Models;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class TenantService : IService<Tenant>
    {
        private readonly IRepository<Tenant> _tenantRepository;

        public TenantService(IRepository<Tenant> tenantRepository)
        {
            _tenantRepository = tenantRepository;
        }

        public async Task<IEnumerable<Tenant>> GetAllAsync()
        {
            return await _tenantRepository.GetAllAsync();
        }

        public async Task<Tenant?> GetByIdAsync(Guid id)
        {
            var tenants = await _tenantRepository.GetAllAsync();
            return tenants.FirstOrDefault(t => t.Id == id);
        }

        public async Task<Tenant> CreateAsync(Tenant tenant)
        {
            return await _tenantRepository.CreateAsync(tenant);
        }

        public Task<Tenant> UpdateAsync(Tenant tenant)
        {
            // TODO: Implement update in repository
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Guid id)
        {
            // TODO: Implement delete in repository
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Tenant>> FindAsync(Expression<Func<Tenant, bool>> predicate)
        {
            var tenants = await _tenantRepository.GetAllAsync();
            return tenants.Where(predicate.Compile());
        }

        public async Task<IEnumerable<Tenant>> GetTenantsAsync()
        {
            return await GetAllAsync();
        }

        public async Task<Tenant> CreateTenantAsync(CreateTenantRequest request)
        {
            var tenant = new Tenant { Name = request.Name };
            return await CreateAsync(tenant);
        }
    }
}
