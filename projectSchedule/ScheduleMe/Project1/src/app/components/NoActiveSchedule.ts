import { Component, EventEmitter,ViewChild,ViewChildren,AfterViewInit } from "@angular/core"
import { DateRangeSelectorComponent } from "./dateRangeSelector.component"
import { nonActiveDayService } from "../Services/nonActiveDayService"
import { NoActiveDay } from "../models/NoActiveDay"
import { nonActiveDayStateManager } from "../Services/nonActiveDayStateManager"
import { vacation } from "./vacation.component"

@Component({
    templateUrl: "./src/app/components/NoActiveScheduleComponent.html",
    selector: "NoActiveSchedule"
})
export class NoActiveSchedule {
    dayInWeek: string[] = ["Sunday", "Monday", "Tuesday ", "Wednesday", "Thursday ", "Friday"];

    constructor(private _nonActiveDaysStateManager: nonActiveDayStateManager, private _nonActiveDaysService: nonActiveDayService) {
        this.DateTimeCurrently = new Date();
        _nonActiveDaysService.getAllNoActiveDayFromService().subscribe(d => { this.noActiveDays = d });  
    }
    noActiveDays: NoActiveDay[];
    
    day: NoActiveDay;

    @ViewChild(DateRangeSelectorComponent)
    private dateTimeCurrentlyFromComponent: DateRangeSelectorComponent;

    DateTimeCurrently: Date;
    SundayCurrently() { return 0; };
num: number = 0;
    ngAfterViewInit() {
        setTimeout(this.DateTimeCurrently = this.dateTimeCurrentlyFromComponent.currentDate, 0);
        setTimeout(() => this.SundayCurrently = () => this.dateTimeCurrentlyFromComponent.sunday, 0);
    }
    /** *  */
    @ViewChildren(vacation)
    private vacationComponent: vacation[];

    changeEveryone() {
        this.vacationComponent.forEach(vac => vac.status = !vac.status); 
    }

    

    AddDay()
    {
        this.day = new NoActiveDay( new Date("2018,5,11"), 1, "המורה חולה");
        this._nonActiveDaysStateManager.AddNoActiveDay(this.day);        
        
    }
    Remove() {
        //this.day = new NoActiveDay( new Date("2018,04,27"), 2, "חתונת הבת של המנהלת");
        //this.day.Id = 2;
        if (this._nonActiveDaysStateManager.GetChangeInListAddNoActiveDay().indexOf(this.day) >= 0)
            this._nonActiveDaysStateManager.CencelNoActiveDay(this.day);
        else
            this._nonActiveDaysStateManager.RemoveNoActiveDay(this.day);
    }
    SaveAll() {
        this._nonActiveDaysService.saveNonActiveDaysListToService(this._nonActiveDaysStateManager.GetChangeInListAddNoActiveDay()).subscribe(data => { alert("save success!!") });
        this._nonActiveDaysService.saveActiveDaysListToService(this._nonActiveDaysStateManager.GetChangeInActiveDaysList()).subscribe(data => { alert("save success!!") });
        this._nonActiveDaysStateManager.ClearNoActiveDay();
    }
    Exit() {
        alert("did you can exit? " + this._nonActiveDaysStateManager.IsStillChanges());
    }

}


