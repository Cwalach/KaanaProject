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
    class HourOfLessonService
    {
        private HourOfLessonRepository repository;
        private ScheduleDB context;
        public HourOfLessonService()
        {
            context = new ScheduleDB();
            repository = new HourOfLessonRepository(context);
        }
        public void Insert(HourOfLesson g)
        {
            repository.Insert(g);
        }
        public HourOfLesson GetByID(int id)
        {
            return repository.GetByID(id);
        }
        public ICollection<HourOfLesson> GetAll()
        {
            return repository.GetAll();
        }

        public void Update(HourOfLesson g)
        {
            repository.Update(g);
        }
        public void DeleteById(int id)
        {
            repository.Delete(id);
        }
        public void Delete(HourOfLesson g)
        {
            repository.Delete(g);
        }
    }
}
