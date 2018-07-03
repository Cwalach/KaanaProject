import { Component, Output, Input, EventEmitter, ViewChild, AfterViewInit } from "@angular/core"
import { DateRangeSelector } from "./dateRangeSelector.component"

import { nonActiveDayService } from "../Services/nonActiveDayService"
import { nonActiveDayStateManager } from "../Services/nonActiveDayStateManager"
//import {CourseInSchedule }from "../components/courseInSchedule"
@Component({
    templateUrl: "./src/app/components/AllDays.component.html",
    selector: "AllDays"

})
export class AllDays {
    isVacation: boolean = true;
   
    day: Date = new Date();
    dayInWeek: string[] = ["ראשון", "שני", "שלישי ", "רביעי", "חמישי ", "שישי"];
    DateTimeCurrently: Date;
    constructor(private nonActiveDayService: nonActiveDayService,
            private nonActiveDayStateManager: nonActiveDayStateManager) {
        this.DateTimeCurrently= new Date();
    }
    @ViewChild(DateRangeSelector)
    private dateTimeCurrentlyFromComponent: DateRangeSelector;
    ChangeAll()
    {
        this.isVacation = !this.isVacation;
    }
    ngAfterViewInit()
    {
        setTimeout(this.DateTimeCurrently = this.dateTimeCurrentlyFromComponent.currentDate, 0);
    }
    getday(i: number): number {
        if (i == 0)
            this.day.setDate(this.DateTimeCurrently.getDate() - ((this.DateTimeCurrently.getDay() + 1) - (i + 1)));
        else
            this.day.setDate(this.day.getDate()+1)
        return this.day.getDate();
    }
    saveChangesInDB()
    {
        if (this.nonActiveDayStateManager.IsStillChanges()) {
            //DB שמירת הרשימות ב  
            this.nonActiveDayService.saveActiveDaysListToService(this.nonActiveDayStateManager.GetChangeInActiveDaysList()).
                subscribe(data => { alert("seccued") }, error => { alert("error"); });
            this.nonActiveDayService.saveNonActiveDaysListToService(this.nonActiveDayStateManager.GetChangeInListAddNoActiveDay()).
                subscribe(data => { alert("seccued") }, error => { alert("error"); });
            //ריקון הרשימות
            this.nonActiveDayStateManager.ClearNoActiveDay();
        }
    }
}

