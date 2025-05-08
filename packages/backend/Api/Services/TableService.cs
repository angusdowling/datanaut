using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Datanaut.Api.Data;
using Datanaut.Models;

namespace Datanaut.Api.Services
{
    public class TableService(
        IRepository<AppTable> tableRepository,
        IRepository<AppColumn> columnRepository,
        IService<AppRow> rowService
    ) : IService<AppTable>
    {
        private readonly IRepository<AppTable> _tableRepository = tableRepository;
        private readonly IRepository<AppColumn> _columnRepository = columnRepository;
        private readonly IService<AppRow> _rowService = rowService;

        public async Task<IEnumerable<AppTable>> GetAllAsync()
        {
            return await _tableRepository.GetAllAsync();
        }

        public async Task<AppTable?> GetByIdAsync(Guid id)
        {
            return await _tableRepository.GetByIdAsync(id);
        }

        public async Task<AppTable> CreateAsync(AppTable table)
        {
            var createdTable = await _tableRepository.CreateAsync(table);

            // Create default columns
            var defaultColumns = new List<AppColumn>
            {
                new()
                {
                    TableId = createdTable.Id,
                    Name = "Name",
                    Type = "single_line_text",
                    Position = 0,
                    IsRequired = true,
                },
                new()
                {
                    TableId = createdTable.Id,
                    Name = "Notes",
                    Type = "long_text",
                    Position = 1,
                    IsRequired = false,
                },
            };

            // Create columns
            foreach (var column in defaultColumns)
            {
                await _columnRepository.CreateAsync(column);
            }

            // Create three empty rows
            for (int i = 0; i < 3; i++)
            {
                var row = new AppRow { TableId = createdTable.Id, CreatedBy = table.CreatedBy };
                await _rowService.CreateAsync(row);
            }

            return createdTable;
        }

        public async Task<AppTable> UpdateAsync(AppTable table)
        {
            return await _tableRepository.UpdateAsync(table);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _tableRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<AppTable>> FindAsync(
            Expression<Func<AppTable, bool>> predicate
        )
        {
            return await _tableRepository.FindAsync(predicate);
        }
    }
}
