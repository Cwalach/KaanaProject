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
            new ReportDetails() {Id=3,SrartDate=new DateTime(2018,06,22),EndDate=new DateTime(2018,06,06), Name = "מתמטיקה", Teacher = "תמר",Group="שנה א", NumHours=10}};
        //internal static List<ReportDetailsCs> ReportDetailsList
        //{
        //    get
        //    {
        //        return reportDetailsList;
        //    }

        //    set
        //    {
        //        reportDetailsList = value;
        //    }
        //}

        public ReportController()
        {
            //courseService = new CourseService();
        }

        [HttpGet]
        //decimal id,DateTime startDate,DateTime endDate
        [Route("api/Report/GetReportDetails/{startDateString}/{endDateString}")]
        public ICollection<ReportDetails> GetReportDetails(string endDateString, string startDateString )//show
        {
         //שתי התאריכים מגיעים אותו דבר  
            DateTime startDate =  DateTime.Parse(startDateString);
            DateTime endDate = DateTime.Parse(endDateString);
            //foreach (var item in reportDetailsList)
            //{
            //    if (reportDetailsList[1].SrartDate == startDate && reportDetailsList[2].EndDate == endDate)
            //        return reportDetailsList;//.Where(c => c.SrartDate == date1 && c.EndDate==date2).ToList();
            //}
            //return null;
            return reportDetailsList.Where(c => c.SrartDate== startDate && c.EndDate==endDate).ToList();
        }

        [Route("api/Report/GetCourses")]
        [HttpGet]
        //DateTime startDate,DateTime endDate,string name
        public ICollection<Course> GetCourses()//to the comboBox
        {
            List<Course> ac = new List<Course>();
            ac = courseService.GetAll().ToList();//.Where(e=>e.Id==id).ToList();
            return ac.ToList();
        }

        public ICollection<Group> GetGroups()//to the comboBox
        {
            List<Group> gr = new List<Group>();
            gr = groupService.GetAll().ToList();//.Where(e=>e.Id==id).ToList();
            return gr.ToList();
        }





        public ReportDetails getReportDeatilsFromServer(DateTime startDate, DateTime endDate, string courseName)
        {
            ReportDetails rs = new ReportDetails();
            //DateTime startDate = DateTime.Parse(startDate);
            int result = 0;
            using (var ctx = new ScheduleDB())
            {
                SqlParameter name, sDate, eDate;
               // foreach (ReportDetails item in ExistingCoursesToSave)
               //{
                    sDate = new SqlParameter("@Date", rs.SrartDate);
                    eDate = new SqlParameter("@Date", rs.EndDate);
                    name = new SqlParameter("@Name",rs.Name);

                    result = ctx.Database.ExecuteSqlCommand("ReportResponse, @CourseName nvarchar(50), @StartDate smalldatetime, @EndDate smalldatetime",courseName, startDate, endDate);
               // }
                //int h = 0; 
                //SqlParameter courseName= new SqlParameter("@courseName", "cobol");
                //SqlParameter coursId = new SqlParameter("@coursId", 1);

                //result = ctx.Database.ExecuteSqlCommand("SaveTry @courseName,@coursId", courseName,coursId);

            }
            return rs;
        }
    }
}

