using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Schedule_Model;
using Schedule_Bl;
using System.Collections.ObjectModel;
using System.Data.SqlClient;

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
        [Route("api/Schedule/{dateToUpdate}/{Comments}")]
        [HttpPost]
        public void Post(ExistingCourses[] ExistingCoursesToSave,string dateToUpdate,string Comments)
        {
            DateTime dateUpdate = DateTime.Parse(dateToUpdate);
            int result = 0;
            using (var ctx = new ScheduleDB())
            {
                SqlParameter date, orderNumber, courseIndex, groupIndex, updateUntilDate, comments;
                foreach (ExistingCourses item in ExistingCoursesToSave)
                {
                    date = new SqlParameter("@date", item.Date);
                    orderNumber = new SqlParameter("@orderNumber", item.OrderNumber);
                    courseIndex = new SqlParameter("@courseIndex", item.CourseId);
                    groupIndex = new SqlParameter("@groupIndex", item.GroupId);
                    updateUntilDate = new SqlParameter("@updateUntilDate", dateUpdate);
                    comments = Comments !="undifined"?new SqlParameter("@Comments", Comments) : new SqlParameter("@Comments", null);
                    result = ctx.Database.ExecuteSqlCommand("insertOrUpdateLessonsUntilDate @date,@orderNumber,@courseIndex,@groupIndex,@updateUntilDate,@Comments", date, orderNumber, courseIndex, groupIndex, updateUntilDate, comments);
                }
                //int h = 0; 
                //SqlParameter courseName= new SqlParameter("@courseName", "cobol");
                //SqlParameter coursId = new SqlParameter("@coursId", 1);

                //result = ctx.Database.ExecuteSqlCommand("SaveTry @courseName,@coursId", courseName,coursId);

            }

        }
    }
}
