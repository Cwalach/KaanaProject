import { Component, Input } from "@angular/core"
import { nonActiveDayStateManager } from "../Services/nonActiveDayStateManager"
import { NoActiveDay } from "../models/NoActiveDay"
@Component({
    templateUrl: "./src/app/components/vacation.component.html",
    selector: "vacation"
})
export class vacation {

    @Input()
    currentId: number;

    @Input()
    status: boolean;
    active: NoActiveDay;

    @Input() 
    currentHour: string;

    @Input()
    date: Date;
    index: number=0;

 
    constructor(private nonActiveStateManager: nonActiveDayStateManager)
    {
        this.active = new NoActiveDay("","","");
    }

    Update()
    {      
        this.status = !this.status;
        this.active.OrderNumber = this.currentHour;
        this.active.Date = this.date;
        this.active.Id = this.currentId;

        alert(this.active.Date+"");
    //    changed to active
        if (this.status)
            this.nonActiveStateManager.CencelNoActiveDay(this.active);
       
        // change to no active
        else
          this.nonActiveStateManager.AddNoActiveDay(this.active);
    }

    updateDate()
    {
        this.index++;
        this.active.Date = this.date;
       
    }

}