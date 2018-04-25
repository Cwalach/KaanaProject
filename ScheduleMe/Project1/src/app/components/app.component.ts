import { Component } from "@angular/core"
import { Volunteer } from "../models/volunteer"
import { VolunteerService } from "../Services/volunteer-service"

@Component({
    //template: "<h1>Hello To :{{title}}</h1>",
    templateUrl:"./src/app/components/app.component.html",
    selector:"Shira-app"
       
})
export class AppComponent
{
 
    constructor(private volonteerService: VolunteerService)
    {
        this.volonteerService.GetVolunteerFromServer().subscribe(data => { this.volunteerList = data }, error => { });
    }
    title: string = "our final project";
   
      volunteerList: Volunteer[];
       //ListByDays:
      removeVolunteer(volunteer: Volunteer) {
          var index = this.volunteerList.indexOf(volunteer);//מציאת האינדקס של האיבר אותו רוצים למחוק
          this.volunteerList.splice(index, 1);//מחיקת המשימה מן הרשימה 
    }

      EditVolunteer(volunteer: Volunteer) {

          this.currentVolunteer = volunteer;
      }
      saveAllVolunteersToServer() {
          this.volonteerService.saveAllVolunteersToServer(this.volunteerList).subscribe(data => { alert("Saved succsessed!!!") });
      }

    addNewVolunteer(){
       
        this.currentVolunteer = new Volunteer();
        //this.currentVolunteer.id = this.volunteerList.length + 1;
        //this.volunteerList.push(this.currentVolunteer);
    }

    currentVolunteer: Volunteer;
  

    saveNewVolunteer(volunteer: Volunteer) {
        this.currentVolunteer.id = this.volunteerList.length + 1;
        for (var i = 0; i < 7; i++)
        {
            this.currentVolunteer.days[i] = volunteer.days[i];
        }
        this.volunteerList.push(volunteer);
        this.currentVolunteer = null;

    }
    CloseDetails() {
        this.currentVolunteer = null;
    }
    ShowVolunteers() {
        //this.volunteerList = this.volonteerService.GetVolunteerByDay(2);
    }
}