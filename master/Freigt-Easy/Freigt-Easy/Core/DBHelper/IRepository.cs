using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.DBHelper
{

    public interface IRepository
    {

        Task<T> GetByIdAsync<T>(int id) where T : class;

        Task<T> GetByIdAsync<T>(Expression<Func<T, bool>> pred, string[] includes) where T : class;
        Task<List<T>> ListAllAsync<T>() where T : class;


        Task AddAsync<T>(T entity) where T : class;
        Task UpdateAsync<T>(T entity) where T : class;
        Task DeleteAsync<T>(T entity) where T : class;
        Task<T> FindSingleAsync<T>(Expression<Func<T, bool>> pred) where T : class;

        T FindSingle<T>(Expression<Func<T, bool>> pred, string[] includes=null) where T : class;

        Task<List<T>> FindFew<T>(Expression<Func<T, bool>> pred) where T : class;

        Task BulkInsert<T>(List<T> entity) where T : class;

        Task<List<T>> ListAllAsyncConditionInclude<T>(Expression<Func<T, bool>> pred, string[] includes) where T : class;
        Task<List<T>> ListAllAsyncIncludes<T>(string[] includes) where T : class;
        Task<List<T>> ListAllAsyncWhere<T>(Expression<Func<T, bool>> pred) where T : class;

    }
}
