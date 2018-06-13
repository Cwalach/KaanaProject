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