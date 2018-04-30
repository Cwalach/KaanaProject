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
    constructor() {
        this.currentDate = new Date();
        this.leftDay = new Date();
        this.rightDay = new Date();
        this.UpdateVariables();
    }
    UpdateVariables(): any {
        this.sunday = this.GetLeftDay();
        this.saturday = this.GetRightDay();
        this.currentMonth = this.rightDay.getMonth() + 1;
    }
    DecreaseDate(): any {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.UpdateVariables();
    }
    IncreaseDate(): any {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.UpdateVariables();
    }

    //???????לבדוק למה לא ממעדכן כראוי
    GetLeftDay(): number {
        this.leftDay.setDate(this.currentDate.getDate() - (this.currentDate.getDay() - 1));
        return this.leftDay.getDate()-1;
    }
    GetRightDay(): number {
        this.rightDay.setDate(this.currentDate.getDate() + (7 - this.currentDate.getDay()));
        return this.rightDay.getDate()-1;
    }
}
