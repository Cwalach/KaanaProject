import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
declare function getHebrowNameByGreb(Date): any;
@Injectable()

export class HebrewDate
{
getHebrewDate(date: Date, numDaysToAdd: number):string
{
    return getHebrowNameByGreb(new Date(this.getHebrewDateAfterAddDate(date, numDaysToAdd)));
   
    }
getHebrewDateAfterAddDate(date: Date, numDaysToAdd: number): number {
    return date.setDate(date.getDate() + 1);
    //return date.setTime(date.getTime() + (numDaysToAdd * (1000 * 60 * 60 * 24)));
}

}

