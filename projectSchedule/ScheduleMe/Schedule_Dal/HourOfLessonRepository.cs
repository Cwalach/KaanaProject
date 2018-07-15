using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Schedule_Model;
namespace Schedule_Dal
{
   public class HourOfLessonRepository : ScheduleRepository<HourOfLesson>
    {
        public HourOfLessonRepository(ScheduleDB context) : base(context)
        {
        }
    }
}
