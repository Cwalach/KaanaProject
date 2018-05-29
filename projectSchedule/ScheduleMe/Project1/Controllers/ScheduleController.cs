using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Schedule_Model;
using Schedule_Bl;
using System.Collections.ObjectModel;
using Schedule_Model;

namespace Schedule_Model.Controllers
{
    public class ScheduleController : ApiController
    {
        CourseService courseService;
        GroupService groupService;
        ExistingCourseService existingCourseService;
        public ScheduleController()
        {
            existingCourseService = new ExistingCourseService();
            courseService = new CourseService();
            groupService = new GroupService();
        }
        [Route("api/Schedule/GetAllCourses")]
        [HttpGet]
        public List<Course> GetAllCourses()
        {   
            return courseService.GetAll().ToList();
        }
        [Route("api/Schedule/AllGroups")]
        [HttpGet]
        public List<Group> AllGroups()
        {
            return groupService.GetAll().ToList();
        }
    }
}
