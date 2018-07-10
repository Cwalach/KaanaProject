using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Schedule_Bl;
using Schedule_Model;
using System.Data.SqlClient;


namespace ScheduleMe.Controllers
{
    public class ReportController : ApiController
    {
        CourseService courseService = new CourseService();
        GroupService groupService = new GroupService();
        ExistingCourseService existingCourseService = new ExistingCourseService();
        ReportDetails reportDetailsCs = new ReportDetails();
        private static List<ReportDetails> reportDetailsList = new List<ReportDetails>() {
            new ReportDetails() {Id=1,SrartDate=new DateTime(2018,06,05),EndDate=new DateTime(2018,06,20),Name = "תכנות", Teacher = "אסנת",Group="שנה א", NumHours=5},
            new ReportDetails() {Id=2,SrartDate=new DateTime(2018,06,05),EndDate=new DateTime(2018,06,20), Name = "גרפיקה", Teacher = "יהודית",Group="שנה ב", NumHours=10},
            new ReportDetails() {Id=3,SrartDate=new DateTime(2018,06,22),EndDate=new DateTime(2018,06,06), Name = "מתמטיקה", Teacher = "תמר",Group="שנה א", NumHours=10},
            new ReportDetails() {Id=3,SrartDate=new DateTime(2018,06,22),EndDate=new DateTime(2018,06,22), Name = "java", Teacher = "תמר",Group="שנה א", NumHours=10}

    };

        [HttpGet]
        [Route("api/Report/GetReportDetails/{startDateString}/{endDateString}/{courseName}")]
        public ICollection<ReportDetails> GetReportDetails(string startDateString, string endDateString, string courseName)//show
        {
            DateTime startDate = DateTime.Parse(startDateString);
            DateTime endDate = DateTime.Parse(endDateString);

            try
            {
                using (ScheduleDB db = new ScheduleDB())
                {
                    var name = new SqlParameter
                    {
                        ParameterName = "@CourseName",
                        Value = courseName
                    };
                    var start = new SqlParameter
                    {
                        ParameterName = "@StartDate",
                        Value = startDate
                    };
                    var end = new SqlParameter
                    {
                        ParameterName = "@EndDate",
                        Value = endDate
                    };


                    ICollection<ReportDetails> dataList = db.Database.SqlQuery<ReportDetails>("exec ReportResponse @CourseName, @StartDate, @EndDate ", name, start, end).ToList<ReportDetails>();
                    return dataList.ToList();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return null;
        }

        [Route("api/Report/GetCourses")]
        [HttpGet]
        public ICollection<Course> GetCourses()//to the comboBox
        {
            List<Course> ac = new List<Course>();
            ac = courseService.GetAll().ToList();
            return ac.ToList();
        }

        public ICollection<Group> GetGroups()//to the comboBox
        {
            List<Group> gr = new List<Group>();
            gr = groupService.GetAll().ToList();
            return gr.ToList();
        }
    }
}

