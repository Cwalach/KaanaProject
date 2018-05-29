import { Injectable } from "@angular/core"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { NoActiveDay } from "../models/NoActiveDay"
@Injectable()
export class nonActiveDayStateManager {

   private nonActiveDaysList: NoActiveDay[]; 
   private activeDaysList: Array<number>;

   constructor() {
       this.nonActiveDaysList = new Array<NoActiveDay>();
       this.activeDaysList=new Array<number>();
   }

   GetChangeInNonActiveDaysList(): Array<NoActiveDay>
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

    //Cancel no Active day that was adding
    CencelNoActiveDay(noActiveDay: NoActiveDay) {
        let index = this.nonActiveDaysList.indexOf(noActiveDay);
        this.nonActiveDaysList.splice(index, 1);
    }

    //clear lists
    ClearNoActiveDay() {
        this.nonActiveDaysList.splice(0, this.nonActiveDaysList.length);
        this.activeDaysList.splice(0, this.activeDaysList.length);
    }

    //is stil change
    IsStillChanges(): boolean {
        return this.nonActiveDaysList[0] == null && this.activeDaysList[0] == null;
    }

    //Remove from the db
    RemoveNoActiveDay(noActiveDay: NoActiveDay)
    {
        this.activeDaysList.push(noActiveDay.Id);
    }
}