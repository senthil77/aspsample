using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.DBHelper
{
    public class Repository<TDbContext> : IRepository where TDbContext : DbContext
    {

        protected readonly RiaDBContext _dbContext;
        private readonly IHttpContextAccessor _webContext;

        public Repository(RiaDBContext dbContext)
        {
            _dbContext = dbContext;
      
        }
        public Repository(RiaDBContext dbContext, IHttpContextAccessor webContext)
        {
            _dbContext = dbContext;
            _webContext = webContext;
        }
        public async Task AddAsync<T>(T entity) where T : class
        {
            this._dbContext.Set<T>().Add(entity);
            _ = await _dbContext.SaveChangesAsync();

        }

        public async Task BulkInsert<T>(List<T> entity) where T : class
        {
            try

            {
                this._dbContext.Set<T>().AddRange(entity);
                _ = await _dbContext.SaveChangesAsync();
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteAsync<T>(T entity) where T : class
        {
            this._dbContext.Set<T>().Remove(entity);
            _ = await _dbContext.SaveChangesAsync();
        }

        public async Task<List<T>> FindFew<T>(Expression<Func<T, bool>> pred) where T : class
        {
            return await this._dbContext.Set<T>().Where(pred).ToListAsync();
        }



        public async Task<T> FindSingleAsync<T>(Expression<Func<T, bool>> pred) where T : class
        {
            try
            {
                return await this._dbContext.Set<T>().Where(pred).FirstOrDefaultAsync();
            }

            catch (Exception e)
            { throw e; }
        }



        public T FindSingle<T>(Expression<Func<T, bool>> pred, string[] includes = null) where T : class
        {


            if (includes != null)
            {
                return this._dbContext.Set<T>().AsQueryable().Where(pred).IncludeMultiple(includes).FirstOrDefault();
            }
            return this._dbContext.Set<T>().AsQueryable().Where(pred).FirstOrDefault();
        }


        public async Task<T> GetByIdAsync<T>(int id) where T : class
        {
            return await this._dbContext.Set<T>().FindAsync(id);

        }

        public async Task<T> GetByIdAsync<T>(Expression<Func<T, bool>> pred, string[] includes) where T : class
        {
            return await this._dbContext.Set<T>().AsQueryable().Where(pred).IncludeMultiple(includes).FirstOrDefaultAsync();

        }

        public async Task<List<T>> ListAllAsync<T>() where T : class
        {


            var result = await this._dbContext.Set<T>().ToListAsync();
            return result;

        }


        public async Task<List<T>> ListAllAsyncIncludes<T>(string[] includes) where T : class
        {

            var result = await this._dbContext.Set<T>().IncludeMultiple(includes).ToListAsync();



            return result;
        }

        public async Task<List<T>> ListAllAsyncConditionInclude<T>(Expression<Func<T, bool>> pred, string[] includes) where T : class
        {

            var result = await this._dbContext.Set<T>().AsQueryable().Where(pred).IncludeMultiple(includes).ToListAsync();



            return result;
        }
        public async Task<List<T>> ListAllAsyncWhere<T>(Expression<Func<T, bool>> pred) where T : class
        {

            var result = await this._dbContext.Set<T>().AsQueryable().Where(pred).ToListAsync();



            return result;
        }

        public async Task UpdateAsync<T>(T entity) where T : class
        {
            
            this._dbContext.Set<T>().Update(entity);
            _ = await _dbContext.SaveChangesAsync();
        }
    }
}
