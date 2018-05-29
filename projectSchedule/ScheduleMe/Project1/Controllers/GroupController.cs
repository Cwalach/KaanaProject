using Schedule_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ScheduleMe.Controllers
{
    public class GroupController : ApiController
    {
        public static List<Group> GroupList = new List<Group>()
        {
            new Group {Id = 1,Name="קבוצה א"},
            new Group {Id = 2,Name="קבוצה ב"},
            new Group {Id = 3,Name="קבוצה ג"},
            new Group {Id = 4,Name="קבוצה ד"}
        };
        public List<Group> Get()
        {
            return GroupList;
        }

        public void Post(Group newGroup)
        {
            Group g = GroupList.First(n => n.Id == newGroup.Id);
            g.Name = newGroup.Name;
            g.ExistingCourses = newGroup.ExistingCourses;
        }
        [Route("api/Group/RemoveGroup/{removedGroup}")]
        [HttpPost]
        public void RemoveGroup(Group removedGroup)
        {
            GroupList.Remove(GroupList.Find(g => g.Id == removedGroup.Id));
        }
    }
}
