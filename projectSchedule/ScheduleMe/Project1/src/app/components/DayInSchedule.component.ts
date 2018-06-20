import { Component, Output, Input, EventEmitter, ViewChildren } from "@angular/core"
import {vacation} from "../components/vacation.component"

@Component({
    templateUrl: "./src/app/components/DayInSchedule.component.html",
    selector: "DayInSchedule"

})
export class DayInSchedule {
   
    @Input()
    dayInWeek: string[];
    @Input()
    currentDay: string;
    @Input()
    currentDate: Date; 
    isVacation: boolean = true;
    @ViewChildren(vacation)
    private myVacation: vacation[];

   

    ChangeAll() {
        this.isVacation = !this.isVacation;
        this.myVacation.forEach(vac => vac.Update());
    }
}

