﻿﻿import { Component, Output, Input, EventEmitter, ViewChild, ViewChildren, AfterViewInit } from "@angular/core"
import { DateRangeSelector } from "./dateRangeSelector.component"
import { ParseDate } from '../Services/parseDateService';
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

    allStatusDays: Array<{ day: Date, status: boolean[], indexs: number[] }> = Array({ 'day': new Date(), 'status': new Array<boolean>(), 'indexs': new Array<number>() });

    dayInWeek: string[] = ["ראשון", "שני", "שלישי ", "רביעי", "חמישי ", "שישי"];
    newDate: Date;

    constructor(private service: nonActiveDayService, private manager: nonActiveDayStateManager, private parseDate: ParseDate) {
        this.allNonActiveDays = new Array<NoActiveDay>();
        //service.getAllNoActiveDayFromService().subscribe(d => { this.allNonActiveDays = (d as Array<NoActiveDay>) });
        this.DateTimeCurrently = new Date();
        this.nonActive = new Array<NoActiveDay>();
        // this.allStatusDays = new Array<{ day: Date, status: boolean }>(7);
        //      this.allStatusDays.forEach((d) => { d.day = new Date(); d.status = true; }); 
        for (var _i = 0; _i < 7; _i++) {
            this.allStatusDays.push({ 'day': new Date(), 'status': new Array<boolean>(17), 'indexs': new Array<number>(17) });
        }
    }

    ngOnInit() {
        this.service.getNoActiveDayByWeekDateFromService(this.dateTimeCurrentlyFromComponent.leftDay).subscribe(d => {
            this.DateTimeCurrently = this.dateTimeCurrentlyFromComponent.date;
            this.allNonActiveDays = (d as Array<NoActiveDay>)
            for (var i = 0; i < 7; i++) {
                this.updateStatus(i);
            }
        });
    }

    @ViewChild(DateRangeSelector)
    private dateTimeCurrentlyFromComponent: DateRangeSelector;

    @ViewChildren(DayInSchedule)
    private listvacation: DayInSchedule[];

    DateTimeCurrently: Date;
    ChangeAll() {
        this.isVacation = !this.isVacation;
    }
    day: NoActiveDay;
    //ngAfterViewInit() {
    //    this.service.getNoActiveDayByWeekDateFromService(this.dateTimeCurrentlyFromComponent.leftDay).subscribe(d => {
    //        setTimeout(this.DateTimeCurrently = this.dateTimeCurrentlyFromComponent.date, 0);
    //        this.allNonActiveDays = (d as Array<NoActiveDay>)        
    //        for (var i = 0; i < 7; i++) {
    //        }
    //        this.updateStatus(i);
    //    });         
    //    //this.allNonActiveDays = new Array<NoActiveDay>();
    //    //this.day = new NoActiveDay(new Date(this.allStatusDays[i].day.toString()), 1, "המורה חולה");
    //    //this.allNonActiveDays.push(this.day);
    //    //this.service.getAllNoActiveDayFromService().subscribe(d => { this.allNonActiveDays = (d as Array<NoActiveDay>) });
    //}
    updateStatus(i: number) {
        this.allNonActiveDays.forEach((day) => {
            var x = new Date(day.Date.toString());
            var a = this.allStatusDays[i];
            if (x.getFullYear() == this.allStatusDays[i].day.getFullYear() &&
                x.getMonth() == this.allStatusDays[i].day.getMonth() &&
                x.getDate() == this.allStatusDays[i].day.getDate()) {

                this.nonActive.push(day);
            }
        }
        );

        this.allStatusDays[i].status = new Array<boolean>(17);
        for (var x = 0; x < 17; x++) {
            this.allStatusDays[i].indexs[x] = 0;
            this.allStatusDays[i].status[x] = true;
        }


        if (this.nonActive.length != 0) {
            this.nonActive.forEach((no) => {
                this.allStatusDays[i].indexs[parseInt(no.OrderNumber) - 1] = no.Id;
                this.allStatusDays[i].status[parseInt(no.OrderNumber) - 1] = false;
            })
        }
        this.nonActive.splice(0, this.nonActive.length);

    }


    getdays(i: number): string {
        this.newDate = new Date();
        this.newDate.setTime(this.dateTimeCurrentlyFromComponent.leftDay.getTime() + (i * (1000 * 60 * 60 * 24)));
        this.allStatusDays[i].day = this.newDate;
        //this.allStatusDays[i].day.setMonth(this.DateTimeCurrently.getMonth());
        //if (i == 0)
        //    this.allStatusDays[i].day.setDate(this.DateTimeCurrently.getDate() - ((this.DateTimeCurrently.getDay() + 1) - (i + 1)));
        //else
        //    this.allStatusDays[i].day.setDate(this.allStatusDays[i - 1].day.getDate() + 1);
        //this.updateStatus(i);
        return  this.parseDate.getHebrowNameByGreb( this.allStatusDays[i].day);
    }

    //getDatesCurrentWeekFromdb(date: Date) {
    //    this.service.getNoActiveDayByWeekDateFromService(date).subscribe(d => { this.allNonActiveDays = (d as Array<NoActiveDay>) });
    //}

    getDatesFromServies() {
        this.service.getNoActiveDayByWeekDateFromService(this.dateTimeCurrentlyFromComponent.leftDay).subscribe(d => {
            this.allNonActiveDays = (d as Array<NoActiveDay>);
            for (var i = 0; i < 7; i++) {
                this.updateStatus(i);
            }
        });
    }
    saveChangesInDB() {
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

