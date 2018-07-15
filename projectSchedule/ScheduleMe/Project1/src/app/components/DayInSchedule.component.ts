import { Component, Output, Input,ViewChildren, EventEmitter } from "@angular/core"
import { NoActiveDay } from "../models/NoActiveDay"
import { vacation } from "./vacation.component"
//import {CourseInSchedule }from "../components/courseInSchedule"
@Component({
    templateUrl: "./src/app/components/DayInSchedule.component.html",
    selector: "DayInSchedule"

})
export class DayInSchedule {
    isVacation: boolean = true;   
    @Input()
    dayInWeek: string[];
    @Input()
    currentDay: string;
    @Input()
    currentDate: Date;
    @Input()
    allStatus: Array<boolean> = new Array<boolean>(17);
    
  
    @ViewChildren(vacation)
    private myVacation: vacation[];



    ChangeAll() {
        this.isVacation = !this.isVacation;
        this.myVacation.forEach(vac => vac.Update());
    }
}


