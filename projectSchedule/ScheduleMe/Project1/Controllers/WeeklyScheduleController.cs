using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Schedule_Bl;
using Schedule_Model;

namespace ScheduleMe.Controllers
{
    public class WeeklyScheduleController : Controller
    {
        // GET: WeeklySchedule
        public ActionResult Index()
        {
            return View();
        }
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