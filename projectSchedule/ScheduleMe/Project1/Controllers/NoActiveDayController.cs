using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Schedule_Bl;
using System.Collections.ObjectModel;

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
            return getNoActiveDays;
        }

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
