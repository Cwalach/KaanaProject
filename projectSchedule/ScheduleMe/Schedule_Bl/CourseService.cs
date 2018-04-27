using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Schedule_Dal;
using Schedule_Model;
namespace Schedule_Bl
{
    public class CourseService
    {
        
        public CourseRepository Repository;
        private ScheduleDB context;
        public CourseService()
        {
            context = new ScheduleDB();
            Repository = new CourseRepository(context);
        }




    }
}
