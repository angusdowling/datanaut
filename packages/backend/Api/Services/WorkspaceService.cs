using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class WorkspaceService(IRepository<Workspace> workspaceRepository) : IService<Workspace>
    {
        private readonly IRepository<Workspace> _workspaceRepository = workspaceRepository;

        public async Task<IEnumerable<Workspace>> GetAllAsync()
        {
            return await _workspaceRepository.GetAllAsync();
        }

        public async Task<Workspace?> GetByIdAsync(Guid id)
        {
            return await _workspaceRepository.GetByIdAsync(id);
        }

        public async Task<Workspace> CreateAsync(Workspace workspace)
        {
            return await _workspaceRepository.CreateAsync(workspace);
        }

        public async Task<Workspace> UpdateAsync(Workspace workspace)
        {
            return await _workspaceRepository.UpdateAsync(workspace);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _workspaceRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Workspace>> FindAsync(
            Expression<Func<Workspace, bool>> predicate
        )
        {
            return await _workspaceRepository.FindAsync(predicate);
        }
    }
}
