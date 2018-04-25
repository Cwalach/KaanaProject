using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ScheduleMe.Controllers
{
        public class Volunteer
        {
            public int id { get; set; }
            public string name { get; set; }
            public string street { get; set; }
            public Boolean[] days { get; set; }
           public Volunteer()
           {
           days=new Boolean[] { false, false, false, false, false, false, false };
           }
    }
    public class VolonteerController : ApiController
    {

        
            public static List<Volunteer> VolunteerList = new List<Volunteer>() {
            new Volunteer() { id = 1, name = "אסנת",street="בן דוד",days=new Boolean [] {true, false, true, false, false, false, true } },
            new Volunteer() { id = 2, name = "שירה",street="קהילות יעקב",days=new Boolean [] {false, false, false, true, false, false, false }},
            new Volunteer() { id = 3, name = "אילה",street="קהילות יעקב",days=new Boolean [] {false, false, true, false, false, true, false }} };

        public int GetVolunteerByDay(int indexDay)
        {
           var l = new ScheduleDB().Course.ToList();
            return l.Count; // VolunteerList.Where(v => v.days[indexDay] == true).ToArray();
        }
        // GET api/<controller>
        public List<Volunteer> Get()
            {
                return VolunteerList;
            }

        public void Post(List<Volunteer> VolunteersToSave)
        {
            VolunteerList = VolunteersToSave;
        }

        public void Put(int id, [FromBody]string value)
            {
            }

            // DELETE api/<controller>/5
            public void Delete(int id)
            {
            }
        }
    }

  
    