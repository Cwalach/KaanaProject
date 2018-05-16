import { Component, Output, Input, EventEmitter } from "@angular/core"

//import {CourseInSchedule }from "../components/courseInSchedule"
@Component({
    templateUrl: "./src/app/components/AllDays.component.html",
    selector: "AllDays"

})
export class AllDays {
    isVacation: boolean = true;
    dayInWeek: string[] = ["Sunday", "Monday", "Tuesday ", "Wednesday", "Thursday ", "Friday"];
    ChangeAll()
    {
        this.isVacation = !this.isVacation;
    }
}

