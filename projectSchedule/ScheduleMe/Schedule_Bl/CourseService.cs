using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Schedule_Dal;
using Schedule_Model;
using System.Linq.Expressions;

namespace Schedule_Bl
{
    public class CourseService
    {
        private CourseRepository repository;
        private ScheduleDB context;
        public CourseService()
        {
            context = new ScheduleDB();
            repository = new CourseRepository(context);
        }

        public void Insert(Course c)
        {
            repository.Insert(c);
        }
        public Course GetByID(int id)
        {
            return repository.GetByID(id);
        }
        public ICollection<Course> GetAll()
        {
            return repository.GetAll();
        }

        public void Update(Course c)
        {
            repository.Update(c);
        }
        public void DeleteById(int id)
        {
            repository.Delete(id);
        }
        public void Delete(Course c)
        {
            repository.Delete(c);
        }
        public IQueryable<Course> GetByQuery(Expression<Func<Course, bool>> p)
        {
            return repository.GetByQuery(p);
        }
    }
}
