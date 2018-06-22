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
            if (newGroup.Id != 0)
                service.Update(newGroup);
            else
                service.Insert(newGroup);
        }
        [Route("api/Group/RemoveGroup/{removedGroup}")]
        [HttpPost]
        public void RemoveGroup(Group removedGroup)
        {
            service.Delete(removedGroup);
            //GroupList.Remove(GroupList.Find(g => g.Id == removedGroup.Id));
        }

        [Route("api/Group/AddGroup/{newGroup}")]
        [HttpPost]
        public void AddGroup(Group newGroup)
        {
            service.Insert(newGroup);
        }
    }
}
