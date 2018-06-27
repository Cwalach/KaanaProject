using Schedule_Bl;
using Schedule_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Schedule_Bl;
using Schedule_Model;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ScheduleMe.Controllers
{
    public class WeeklyScheduleController : ApiController
    {
        // GET: WeeklySchedule

        CourseService Cservice = new CourseService();
        ExistingCourseService ECservice = new ExistingCourseService();
        GroupService Gservice = new GroupService();
        ICollection<ExistingCourses> ECourseslist;
        ICollection<Course> Courseslist;
        ICollection<Group> listGroups;
        [Route("api/WeeklySchedule/GetExistingCourses")]
        [HttpGet]
        public ICollection<ExistingCourses> GetExistingCourses()
        {
            ECourseslist = ECservice.GetAll();
            return ECourseslist;
        }
        [Route("api/WeeklySchedule/GetExistingCoursesForWeek/{snudayOfWeek}/{selectedGroup}")]
        //האם חייב להחזיר משהו מסוג
        //ICollection?????
        public List<List<ExistingCourses>> GetExistingCoursesForWeek(DateTime snudayOfWeek,Group selectedGroup)
        {
            //סנכרון עם הפרוצדורה שרחלי כתבה - שליפה מהדטה בייס לפי תנאי
            //Expression<Func<ExistingCourses, bool>> 
         
              

            ECourseslist = ECservice.GetAll();
            //ECourseslist = GetExistingCourses();
            List<List<ExistingCourses>> arr=new List<List<ExistingCourses>>();
            DateTime d = new DateTime();
            foreach (var course in ECourseslist)
            {
                if (course.Group == selectedGroup && (course.Date >= snudayOfWeek && course.Date <= snudayOfWeek))
                    arr[(course.Date.Value.Day) - 1].Add(course);
            }
            return arr;
        }

        [Route("WeeklySchedule/GetCourses")]
        public ICollection<Course> GetCourses()
        {
            Courseslist = Cservice.GetAll();
            return Courseslist;
        }

        [Route("WeeklySchedule/GetGroups")]
        public ICollection<Group> GetGroups()
        {
            listGroups = Gservice.GetAll();
            return listGroups;
        }
        [Route("api/WeeklySchedule/AllGroups")]
        [HttpGet]
        public List<Group> AllGroups()
        {
            return Gservice.GetAll().ToList();

        }

        //public Group Get()
        //{
        //    li = Gservice.GetAll();
        //    return Gservice.GetByID(1);
        //}

        //public int Get()
        //{
        //    li = ECservice.GetAll();
        //    return 2;// ECservice.GetAll();
        //}
    }
}