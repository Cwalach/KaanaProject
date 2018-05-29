using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Schedule_Bl;
using Schedule_Model;
namespace ScheduleMe.Controllers
{
    public class CourseController : ApiController
    {
        public static ICollection<Course> CoursesList = new List<Course> {
            new Course { Id=1,Name="התעמלות",Instructor="חיה רוט"},
            new Course { Id=2,Name="ריתמיקה",Instructor="שולמית רוט"},
            new Course { Id=3,Name="יצירה",Instructor="חיה רוט"},
            new Course { Id=4,Name="התעמלות",Instructor="חיה רוט"} ,
            new Course { Id=5,Name="התעמלות",Instructor="חיה רוט"} };
        CourseService service;
        Schedule_Dal.ScheduleRepository<Course> s;

        public CourseController()
        {
            //s = new 
            service = new CourseService();
        }
        // GET api/<controller>
        public IEnumerable<Course> Get()
        {
            return CoursesList;
            //return service.Repository.Get();
        }
        public void Post(Course newCourse)
        {
            Course c = CoursesList.First(x => x.Id == newCourse.Id);
            c.Name = newCourse.Name;
            c.Instructor = newCourse.Instructor;
        }
        [Route("api/Course/RemoveCourse/{removedCourse}")]
        [HttpPost]
        public void RemoveCourse(Course removedCourse)
        {
           // CoursesList.Remove(CoursesList.Find(r => r.Id == removedCourse.Id));
        }
    }
}

/*
 עריכה - יש בעיה באינפוט - קבלת הקורס מאפ-קומפוננט 1.
 לא לאפשר שמירה לשדות ריקים
 לסמן בכחול שורה במצב עריכה
*/
