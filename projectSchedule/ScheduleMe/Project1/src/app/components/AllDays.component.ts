﻿import { Component, Output, Input, EventEmitter, ViewChild, ViewChildren, AfterViewInit } from "@angular/core"
import { DateRangeSelector } from "./dateRangeSelector.component"

import { nonActiveDayService } from "../Services/nonActiveDayService"
import { nonActiveDayStateManager } from "../Services/nonActiveDayStateManager"
import { NoActiveDay } from "../models/NoActiveDay"
import { DayInSchedule } from "./DayInSchedule.component"
import { vacation } from "./vacation.component"
//import {CourseInSchedule }from "../components/courseInSchedule"
@Component({
    templateUrl: "./src/app/components/AllDays.component.html",
    selector: "AllDays"

})
export class AllDays {
    isVacation: boolean = true;
    allNonActiveDays: NoActiveDay[];
    nonActive: NoActiveDay[];
    //  day: Date[];

    //allStatusDays = {
    //    day: Date;
    //    status: boolean;
    //}

    allStatusDays: Array<{ day: Date, status: boolean[] }> = Array({ 'day': new Date(), 'status': new Array<boolean>() });

    dayInWeek: string[] = ["ראשון", "שני", "שלישי ", "רביעי", "חמישי ", "שישי"];

    constructor(private service: nonActiveDayService, private manager: nonActiveDayStateManager) {
        this.allNonActiveDays = new Array<NoActiveDay>();
        service.getAllNoActiveDayFromService().subscribe(d => { this.allNonActiveDays = (d as Array<NoActiveDay>) });
        this.DateTimeCurrently = new Date();
        this.nonActive = new Array<NoActiveDay>();
        // this.allStatusDays = new Array<{ day: Date, status: boolean }>(7);
        //      this.allStatusDays.forEach((d) => { d.day = new Date(); d.status = true; }); 
        for (var _i = 0; _i < 7; _i++) {
            this.allStatusDays.push({ 'day': new Date(), 'status': new Array<boolean>(17) });
        }




    }

    @ViewChild(DateRangeSelector)
    private dateTimeCurrentlyFromComponent: DateRangeSelector;

    @ViewChildren(vacation)
    private listvacation: vacation[];

    DateTimeCurrently: Date;
    ChangeAll() {
        this.isVacation = !this.isVacation;
    }
    day: NoActiveDay;
    ngAfterViewInit() {
        this.service.getAllNoActiveDayFromService().subscribe(d => {
            this.allNonActiveDays = (d as Array<NoActiveDay>)

            setTimeout(this.DateTimeCurrently = this.dateTimeCurrentlyFromComponent.currentDate, 0);
            for (var i = 0; i < 7; i++) {
            }
            this.updateStatus(i);
            })
        //this.allNonActiveDays = new Array<NoActiveDay>();
        //this.day = new NoActiveDay(new Date(this.allStatusDays[i].day.toString()), 1, "המורה חולה");
        //this.allNonActiveDays.push(this.day);
        //this.service.getAllNoActiveDayFromService().subscribe(d => { this.allNonActiveDays = (d as Array<NoActiveDay>) });
      
    }
    updateStatus(i: number) {
        this.allNonActiveDays.forEach((day) => {
            var x = new Date(day.Date.toString());

            if (x.getFullYear() == this.allStatusDays[i].day.getFullYear() &&
                x.getMonth() == this.allStatusDays[i].day.getMonth() &&
                x.getDate() == this.allStatusDays[i].day.getDate()) {

                this.nonActive.push(day);
            }
        }
        );

        this.allStatusDays[i].status = new Array<boolean>(17);
        for (var x = 0; x < 17; x++) {
            this.allStatusDays[i].status[x] = true;
        }


        if (this.nonActive.length != 0) {
            this.nonActive.forEach((no) => {
                this.allStatusDays[i].status[parseInt(no.OrderNumber) - 1] = false;
            })
        }
        this.nonActive.splice(0, this.nonActive.length);

    }


    getdays(i: number): number {
        this.allStatusDays[i].day = new Date();

        if (i == 0)
            this.allStatusDays[i].day.setDate(this.DateTimeCurrently.getDate() - ((this.DateTimeCurrently.getDay() + 1) - (i + 1)));
        else
            this.allStatusDays[i].day.setDate(this.allStatusDays[i - 1].day.getDate() + 1);
        this.updateStatus(i);
        return this.allStatusDays[i].day.getDate();
    }

    getDatesCurrentWeekFromdb(date: Date) {
        this.service.getNoActiveDayByWeekDateFromService(date).subscribe(d => { this.allNonActiveDays = (d as Array<NoActiveDay>) });

    }

    getDatesFromServies() {
       // this.dateTimeCurrentlyFromComponent.rightDay;
        this.service.getNoActiveDayByWeekDateFromService(this.allStatusDays[0].day).subscribe(d => { this.allNonActiveDays = (d as Array<NoActiveDay>) });
    }
    saveChangesInDB()
    {
        if (this.manager.IsStillChanges()) {
            //DB שמירת הרשימות ב  
            this.service.saveActiveDaysListToService(this.manager.GetChangeInActiveDaysList()).
                subscribe(data => { alert("seccued") }, error => { alert("error"); });
            this.service.saveNonActiveDaysListToService(this.manager.GetChangeInListAddNoActiveDay()).
                subscribe(data => { alert("seccued") }, error => { alert("error"); });
            //ריקון הרשימות
            this.manager.ClearNoActiveDay();
        }
    }
}

