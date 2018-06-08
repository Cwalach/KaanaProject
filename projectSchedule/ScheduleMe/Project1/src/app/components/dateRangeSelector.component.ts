import { Component } from "@angular/core"

@Component({
    templateUrl: "./src/app/components/DateRangeSelector.component.html",
    selector: "DateRangeSelector"
})
export class DateRangeSelectorComponent {
    currentDate: Date;
    leftDay: Date;
    rightDay: Date;
    sunday: number;
    saturday: number;
    currentMonth: number;
    sun: number 
    constructor() {
        this.currentDate = new Date();
        this.leftDay = new Date();
        this.rightDay = new Date();
        this.InitializationLeftAndRightDateWeekAgo();
        this.UpdateVariablesInc();
        this.sun = this.currentDate.getDay()+1;
    }
    UpdateVariablesInc(): any {
        this.sunday = this.GetLeftDayInc();
        this.saturday = this.GetRightDayInc();
        this.currentMonth = this.rightDay.getMonth() + 1;
    }
    UpdateVariablesDesc(): any {
        this.sunday = this.GetLeftDayDesc();
        this.saturday = this.GetRightDayDesc();
        this.currentMonth = this.rightDay.getMonth() + 1;
    }
    DecreaseDate(): any {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.UpdateVariablesDesc();
    }
    IncreaseDate(): any {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.UpdateVariablesInc();
    }
    InitializationLeftAndRightDateWeekAgo()
    { 
        this.leftDay.setDate((  this.currentDate.getDate() - ((this.currentDate.getDay() + 1) - 1 ))   -7 );
        this.rightDay.setDate(  this.currentDate.getDate() + (7 - (this.currentDate.getDay() + 1))     -7 );
    }
    GetLeftDayInc(): number {
        this.leftDay.setDate(this.leftDay.getDate() + 7);
        return this.leftDay.getDate();
    }
    GetRightDayInc(): number {
        this.rightDay.setDate(this.rightDay.getDate() + 7);
        return this.rightDay.getDate();
    }
    GetLeftDayDesc(): number {
        this.leftDay.setDate(this.leftDay.getDate() - 7);
        return this.leftDay.getDate();
    }
    GetRightDayDesc(): number {
        this.rightDay.setDate(this.rightDay.getDate() - 7);
        return this.rightDay.getDate();
    }
}
