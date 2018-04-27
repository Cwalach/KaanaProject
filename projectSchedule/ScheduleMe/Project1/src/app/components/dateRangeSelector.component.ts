import { Component } from "@angular/core"
@Component({
    templateUrl: "./src/app/components/DateRangeSelector.component.html",
    selector: "DateRangeSelector"
})
export class DateRangeSelectorComponent {
    date: Date = new Date();
    d: Date;
    days: number;
    sunday: number;
    saturday: number;
    currentMonth: number;
    constructor() {
        this.sunday = this.GetDateOfSunday();
        this.saturday = this.GetDateOfSaturday();
        this.currentMonth = this.date.getMonth();
    }

    GetDateOfSunday(): number {
        this.d = this.date;
        this.days = this.d.getDay() - 1;
        this.d = new Date(this.d.setDate(this.d.getDate() - this.days));
        return this.d.getDay();
    }
    GetDateOfSaturday(): number {
        this.d = this.date;
        this.days = 7 - this.d.getDay();
        this.d = new Date(this.d.setDate(this.d.getDate() + this.days));
        return this.d.getDay();
    }
}
