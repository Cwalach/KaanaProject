using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Schedule_Bl;
using Schedule_Model;
using System.Web.Http;

namespace ScheduleMe.Controllers
{
    public class WeeklyScheduleController : ApiController
    {
       // GET: WeeklySchedule
       //public ActionResult Index()
       //{
       //    return View();
       //}
       ExistingCourseService ECservice = new ExistingCourseService();
       GroupService Gservice = new GroupService();
        [Route("ExistingCourses")]
       public ICollection<ExistingCourses> GetExistingCourses()
       {
            return ECservice.GetAll();
       }
     //  [Route("Groups")]
       public ICollection<Group> GetGroups()
       {
           return Gservice.GetAll();
       }
    }
}