using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Schedule_Bl;

namespace Schedule_Model.Controllers
{
    public class ScheduleController : ApiController
    {
        CourseService courseService;
        public ScheduleController()
        {
            courseService = new CourseService();
        }
        public int Get()
        {
            courseService.Repository.GetByID(4);
            return 0;
         }

    }
}
