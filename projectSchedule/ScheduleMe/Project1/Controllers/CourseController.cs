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
        CourseService service;
        IEnumerable<Course> CoursesList;

        public CourseController()
        {
            service = new CourseService();
            CoursesList = service.GetAll();

        }
        // GET api/<controller>
        public IEnumerable<Course> Get()
        {
            return CoursesList;
        }
        public void Post(Course newCourse)
        {
            //Course c = CoursesList.First(x => x.Id == newCourse.Id);
            //c.Name = newCourse.Name;
            //c.Instructor = newCourse.Instructor;
            service.Update(newCourse);
        }
        [Route("api/Course/RemoveCourse/{removedCourse}")]
        [HttpPost]
        public void RemoveCourse(Course removedCourse)
        {
            // CoursesList.Remove(CoursesList.Find(r => r.Id == removedCourse.Id));
            service.Delete(removedCourse);
        }
    }
}

/*
 עריכה - יש בעיה באינפוט - קבלת הקורס מאפ-קומפוננט 1.
 לא לאפשר שמירה לשדות ריקים
 לסמן בכחול שורה במצב עריכה
*/
