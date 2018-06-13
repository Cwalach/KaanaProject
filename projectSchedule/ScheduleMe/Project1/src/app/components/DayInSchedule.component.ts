import { Component, Output, Input, EventEmitter } from "@angular/core"

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
    ChangeAll() {
        this.isVacation = !this.isVacation;
    }
}

