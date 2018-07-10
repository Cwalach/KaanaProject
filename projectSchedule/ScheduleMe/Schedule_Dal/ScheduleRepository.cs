using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.Entity;
using Schedule_Model;

namespace Schedule_Dal
{
 public abstract  class ScheduleRepository<T>  where T : class
   
    {
        internal ScheduleDB context;
        internal DbSet<T> dbSet;

        public ScheduleRepository(ScheduleDB context)
        {
            this.context = context;
            this.dbSet = context.Set<T>();
        }

       
        public ICollection<T> GetAll()
        {
            return dbSet.AsEnumerable<T>().ToList();
        }
        public virtual T GetByID(object id)
        {
            return dbSet.Find(id);
        }

        public virtual void Insert(T entity)
        {
            dbSet.Add(entity);
            context.SaveChanges();
        }

        public virtual void Delete(object id)
        {        
            T entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(T entityToDelete)
        {
            using (var context = new ScheduleDB())
            {
                context.Entry(entityToDelete).State = System.Data.Entity.EntityState.Deleted;
                context.SaveChanges();
            }

        }

        public virtual void Update(T entityToUpdate)
        {
            using (var context = new ScheduleDB())
            {
                context.Entry(entityToUpdate).State = EntityState.Modified;
                context.SaveChanges(); //Must be in using block
            }
        }

        public IQueryable<T> GetByQuery(Expression<Func<T, bool>> query)
        {
            return dbSet.Where<T>(query);
        }
    }
}
