import { Component, Input, Output, EventEmitter } from "@angular/core"

@Component({
    templateUrl: "./src/app/components/try.component.html",
    selector: "try"
})
export class Try {
    statusbtn1: boolean = false
    statusbtn2: boolean = false;
    statusbtn3: boolean = false;
    clickEvent(id: string)
    {
        if (id == "schduleGroups")
        {
            this.statusbtn1 = true;
            this.statusbtn2 = false;
            this.statusbtn3 = false;
          
        }
        if (id == "manegement") {
            this.statusbtn2 = true;
               this.statusbtn1 = false;
               this.statusbtn3 = false;
        }
        if (id == "report") {
            this.statusbtn3 = true;
                this.statusbtn1 = false;
                this.statusbtn2 = false;
        }

        }
        //this.statusbtn1 = !this.statusbtn1;
        
    }
    //@Input()
    //volunteer: Volunteer;

    //@Output()
    //onSaveNewVolunteer: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();

    ////allUsers: User[] = USERS;

    //submitted: boolean = false;

    //saveNewVolunteer()
    //{
    //    this.onSaveNewVolunteer.emit(this.volunteer);
    //    this.submitted = true;         
    //    this.volunteer = null;
    //}


//<style>
//.MyClass123{
//    content: url("http://imgur.com/SZ8Cm.jpg");
//}
//</style>

//    < img class="MyClass123" />