import { Injectable } from "@angular/core"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { NoActiveDay } from "../models/NoActiveDay"
@Injectable()
export class nonActiveDayStateManager {

    private nonActiveDaysList: NoActiveDay[];
    private activeDaysList: Array<number>;

   constructor() {
       //change to no active
       this.nonActiveDaysList = new Array<NoActiveDay>();
       //change to active
       this.activeDaysList = new Array<number>();
   }

    GetChangeInListAddNoActiveDay(): Array<NoActiveDay>
    {
        return this.nonActiveDaysList;
    }

    GetChangeInActiveDaysList(): Array<number> {
        return this.activeDaysList;
    }

    //Add no Active day to the list
    AddNoActiveDay(noActiveDay: NoActiveDay)
    {
        this.nonActiveDaysList.push(noActiveDay);
    }

    //Cancel no Active day 
    CencelNoActiveDay(noActiveDay: NoActiveDay) {
        if (this.nonActiveDaysList.indexOf(noActiveDay) >= 0)
        {
            let index = this.nonActiveDaysList.indexOf(noActiveDay);
            this.nonActiveDaysList.splice(index, 1);
        }
        else
            this.RemoveNoActiveDay(noActiveDay);
    }
    
    //clear lists
    ClearNoActiveDay() {
        this.nonActiveDaysList.splice(0, this.nonActiveDaysList.length);
        this.activeDaysList.splice(0, this.activeDaysList.length);
    }

    //is stil change
    IsStillChanges(): boolean {
        return this.nonActiveDaysList[0] != null || this.activeDaysList[0] != null;
    }

    //update for remove from db
    RemoveNoActiveDay(noActiveDay: NoActiveDay)
    {
        this.activeDaysList.push(noActiveDay.Id);
    }
}