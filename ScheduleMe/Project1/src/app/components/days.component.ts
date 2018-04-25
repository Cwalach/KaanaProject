import { Component, Output, Input, EventEmitter} from "@angular/core"
import { Volunteer } from "../models/volunteer"
import { VolunteerService } from "../Services/volunteer-service"
@Component({
    //template: "<h1>Hello To :{{title}}</h1>",
    templateUrl: "./src/app/components/days.component.html",
    selector: "days"
    //Shira-app
})
export class Days
{

    title: string = "Days Volunteer";
    @Input()
    listVolunteer: Volunteer[];
    dayInWeek: string[];

    @Output()
    onShowVolunteer: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();
    constructor(private ser:VolunteerService) {
        this.dayInWeek = ["Sunday","Monday","Thu","Wen","Tusday","friday","shabat"];
    }
   
    showVolunteer(day:string) {
        this.onShowVolunteer.emit();
    }
    //getVolunteerByDays(index: number): Volunteer[] {
    //    (this.ser.getVolunteerByIndex(index).subscribe(data => this.listVolunteer = data));
    //    return this.listVolunteer;
    //}
    getVolunteerByDays(index: number): Volunteer[] {
        if (!this.listVolunteer)
            return [];
        return this.listVolunteer.filter(v => v.days[index] == true);
        
    }
}