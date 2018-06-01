using Schedule_Bl;
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
        GroupService service;
        List<Group> GroupList = new List<Group>();
        public GroupController()
        {
            service = new GroupService();
            GroupList = service.GetAll().ToList();
        }
        public IEnumerable<Group> Get()
        {
            return GroupList;
        }

        public void Post(Group newGroup)
        {
            service.Update(newGroup);
            //Group g = GroupList.First(n => n.Id == newGroup.Id);
            //g.Name = newGroup.Name;
            //g.ExistingCourses = newGroup.ExistingCourses;
        }
        [Route("api/Group/RemoveGroup/{removedGroup}")]
        [HttpPost]
        public void RemoveGroup(Group removedGroup)
        {
            service.Delete(removedGroup);
            //GroupList.Remove(GroupList.Find(g => g.Id == removedGroup.Id));
        }
    }
}
