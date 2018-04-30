import { Component, Output, Input, EventEmitter} from "@angular/core"

//import {CourseInSchedule }from "../components/courseInSchedule"
@Component({
    templateUrl: "./src/app/components/scheduleBoard.html",
    selector: "scheduleBoard"
})
export class scheduleBoard {
    dayInWeek: string[] = ["Sunday", "Monday", "Tuesday ", "Wednesday", "Thursday ", "Friday"];
   
}


  