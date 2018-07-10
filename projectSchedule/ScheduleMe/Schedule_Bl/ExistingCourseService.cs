using Schedule_Dal;
using Schedule_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Schedule_Bl
{
   public class ExistingCourseService
    {
        private ExistinCourseRepository repository;
        private ScheduleDB context;
        public ExistingCourseService()
        {
            context = new ScheduleDB();
            repository = new ExistinCourseRepository(context);
        }
        public void Insert(ExistingCourses e)
        {
            repository.Insert(e);
        }
        public ExistingCourses GetByID(int id)
        {
            return repository.GetByID(id);
        }
        public ICollection<ExistingCourses> GetAll()
        {
            return repository.GetAll();
        }
        public IQueryable<ExistingCourses> GetByQuery(Expression<Func<ExistingCourses, bool>> query)
        {
            return repository.GetByQuery(query);
        }
        public void Update(ExistingCourses e)
        {
            repository.Update(e);
        }
        public void DeleteById(int id)
        {
            repository.Delete(id);
        }
        public void Delete(ExistingCourses e)
        {
            repository.Delete(e);
        }
    }
}
