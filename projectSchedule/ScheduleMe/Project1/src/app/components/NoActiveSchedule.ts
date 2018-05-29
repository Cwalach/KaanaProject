import { Component, Output, Input, EventEmitter } from "@angular/core"
import { DateRangeSelectorComponent } from "./dateRangeSelector.component"
import { nonActiveDayService } from "../Services/nonActiveDayService"
import { NoActiveDay } from "../models/NoActiveDay"
import { nonActiveDayStateManager } from "../Services/nonActiveDayStateManager"

@Component({
    templateUrl: "./src/app/components/NoActiveScheduleComponent.html",
    selector: "NoActiveSchedule"
})
export class NoActiveSchedule {
    dayInWeek: string[] = ["Sunday", "Monday", "Tuesday ", "Wednesday", "Thursday ", "Friday"];

    constructor(private _nonActiveDaysStateManager: nonActiveDayStateManager, private _nonActiveDaysService: nonActiveDayService) {     
    }
    noActiveDays: NoActiveDay[];
    
    day: NoActiveDay;

    AddDay()
    {
        this.day = new NoActiveDay(3, new Date("2018,5,11"), 1, "המורה חולה");
        this._nonActiveDaysStateManager.AddNoActiveDay(this.day);        
        
    }
    Remove() {
        this.day = new NoActiveDay(1, new Date("2018,04,27"), 2, "חתונת הבת של המנהלת");

        if (this._nonActiveDaysStateManager.GetChangeInNonActiveDaysList().indexOf(this.day) >= 0)
            this._nonActiveDaysStateManager.CencelNoActiveDay(this.day);
        else
            this._nonActiveDaysStateManager.RemoveNoActiveDay(this.day);
    }
    SaveAll() {
        this._nonActiveDaysService.saveNonActiveDaysListToService(this._nonActiveDaysStateManager.GetChangeInNonActiveDaysList()).subscribe(data => { alert("save success!!") });
        this._nonActiveDaysService.saveActiveDaysListToService(this._nonActiveDaysStateManager.GetChangeInActiveDaysList()).subscribe(data => { alert("save success!!") });
        this._nonActiveDaysStateManager.ClearNoActiveDay();
    }
    Exit() {
        alert("did you can exit? " + this._nonActiveDaysStateManager.IsStillChanges());
    }
}


