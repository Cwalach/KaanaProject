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
using System.Linq.Expressions;

namespace ScheduleMe.Controllers
{
    public class WeeklyScheduleController : ApiController
    {
        // GET: WeeklySchedule

        CourseService Cservice = new CourseService();
        ExistingCourseService ECservice = new ExistingCourseService();
        GroupService Gservice = new GroupService();
        ICollection<ExistingCourses> ECourseslist;
        IQueryable<ExistingCourses> ECourseslistForWeek;
        ICollection<Course> Courseslist;
        ICollection<Group> listGroups;
        [Route("api/WeeklySchedule/GetExistingCourses")]
        [HttpGet]
        public ICollection<ExistingCourses> GetExistingCourses()
        {
            ECourseslist = ECservice.GetAll();
            return ECourseslist;
        }

        [HttpGet]
        [Route("api/WeeklySchedule/GetExistingCoursesForWeek/{snudayOfWeek}/{selectedGroupId}")]
        //האם חייב להחזיר משהו מסוג
        //ICollection?????
        //public List<ExistingCourses>[] GetExistingCoursesForWeek(string snudayOfWeek, int selectedGroupId)
        public ExistingCourses[][] GetExistingCoursesForWeek(string snudayOfWeek, int selectedGroupId)
        {
            DateTime date = DateTime.Parse(snudayOfWeek);
            DateTime d =new DateTime();
            d = date;
            d=d.AddDays(5);
            List<Expression<Func<ExistingCourses, bool>>> queryList = new List<Expression<Func<ExistingCourses, bool>>>();
            Expression<Func<ExistingCourses, bool>> query = e => e.Group.Id == selectedGroupId && (e.Date >= date && e.Date <= d);
            ECourseslistForWeek = ECservice.GetByQuery(query);
            //List<ExistingCourses>[] arr = new List<ExistingCourses>[6];
            ExistingCourses[][] arr = new ExistingCourses[][] 
            {new ExistingCourses[17],new ExistingCourses[17], new ExistingCourses[17], new ExistingCourses[17], new ExistingCourses[17] ,new ExistingCourses[17]};



            foreach (var course in ECourseslistForWeek)
            {
                int day = (int)(course.Date.Value.DayOfWeek);
                if(arr[day]==null)
                    arr[day] = new ExistingCourses[17];
                arr[day][int.Parse(course.OrderNumber.ToString())]=course;
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