using System.Linq.Expressions;

namespace Datanaut.Api.Data
{
    public interface IRepository<T> : IRepositoryMarker
        where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(Guid id);
        Task<T> CreateAsync(T entity);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

        virtual Task<T> UpdateAsync(T entity)
        {
            throw new NotImplementedException(
                "UpdateAsync is not implemented by default. Override this method in your repository implementation if needed."
            );
        }
    }
}
