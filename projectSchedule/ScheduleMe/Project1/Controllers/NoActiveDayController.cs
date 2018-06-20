using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Schedule_Bl;
using System.Collections.ObjectModel;
using Nager.Date;

namespace Schedule_Model.Controllers
{
    public class NoActiveDayController : ApiController
    {       
        NonActiveDaysService noActiveDaysService;
        public NoActiveDayController()
        {
            noActiveDaysService = new NonActiveDaysService();            
        }

        
        [Route("api/NoActiveDay/GetNoActiveDay")]
        public List<NonActiveDays>  GetNoActiveDay()
        {            
            List<NonActiveDays> getNoActiveDays = noActiveDaysService.GetAll().ToList();
            //to insert to DB nonActiveDay
            //fillNonVactionDaysFromApi(DateTime.Now, DateTime.Now.AddYears(20));
            return getNoActiveDays;
        }
        //private void fillNonVactionDaysFromApi(DateTime startDate, DateTime endDate)
        //{
        //    ////this.contexts = new ScheduleDB();
        //    ////this.dbSets = this.contexts.Set<NonActiveDays>();
        //    //var publicHolidays = DateSystem.GetPublicHoliday(CountryCode.IS, startDate, endDate);
        //    //for (int i = 0, orderNumber = 1; i < publicHolidays.Count() && orderNumber <= 17; orderNumber++)
        //    {
        //        NonActiveDays day = new NonActiveDays();
        //        day.Date = publicHolidays.ElementAt(i).Date;
        //        day.OrderNumber = orderNumber;
        //        day.Reason = "מטעם החינוך העצמאי";
        //        noActiveDaysService.Insert(day);
        //        ////dbSets.Add(day);
        //       // //contexts.SaveChanges();
        //        if (orderNumber == 17)
        //        {
        //            orderNumber = 0;
        //            i++;
        //        }
        //    }
        //}

        [Route("api/NoActiveDay/AddNoActiveDay")]
        [HttpPost]
        public void AddNoActiveDay(List<NonActiveDays> ListAddNoActiveDay)
        {
            
            foreach (NonActiveDays day in ListAddNoActiveDay)
            {
                noActiveDaysService.Insert(day);
            }            

        }

        [Route("api/NoActiveDay/RemoveNoActiveDay")]
        [HttpPost]
        public void RemoveNoActiveDay(List<int> ListRemoveNoActiveDay)
        {
            foreach (int day in ListRemoveNoActiveDay)
            {
                noActiveDaysService.DeleteById(day);
            }            
        }
    }
}
