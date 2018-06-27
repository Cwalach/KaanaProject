import { Component } from "@angular/core"
import { UpdateScheduleBoard } from "../Services/UpdateScheduleBoard"
@Component({
    templateUrl: "./src/app/components/DateRangeSelector.component.html",
    selector: "DateRangeSelector"
})
export class DateRangeSelector {
    currentDate: Date;
    date: Date;
    day: number;
    leftDay: Date;
    rightDay: Date;
    sunday: number;
    saturday: number;
    currentMonth: number;

    constructor(private updateScheduleBoard: UpdateScheduleBoard) {
        this.currentDate = new Date();
        this.date = new Date();
        this.leftDay = new Date();
        this.rightDay = new Date();
        this.SetLeftDay();
        this.SetRightDay();
        this.UpdateVariables();
        this.day = this.leftDay.getDay();
    }

    SetLeftDay(): any {
        this.leftDay.setDate(this.currentDate.getDate() - ((this.currentDate.getDay() + 1) - 1));
    }

    SetRightDay(): any {
        this.rightDay.setDate(this.currentDate.getDate() + (7 - (this.currentDate.getDay() + 1)));
    }

    UpdateDecreaseDate(): any {
        this.leftDay.setDate(this.leftDay.getDate() - 7);
        this.rightDay.setDate(this.rightDay.getDate() - 7);
        this.date.setDate(this.date.getDate() - 7);
    }

    UpdateIncreaseDate(): any {
        this.leftDay.setDate(this.leftDay.getDate() + 7);
        this.rightDay.setDate(this.rightDay.getDate() + 7);
        this.date.setDate(this.date.getDate() + 7);
    }

    DecreaseDate(): any {
        this.UpdateDecreaseDate();
        this.UpdateVariables();
        this.day = this.leftDay.getDay();
        this.updateScheduleBoard.ChangeDate(this.date);
    }

    IncreaseDate(): any {
        this.UpdateIncreaseDate();
        this.UpdateVariables();
        this.day = this.leftDay.getDay();
        this.updateScheduleBoard.ChangeDate(this.date);
    }

    UpdateVariables(): any {
        this.sunday = this.leftDay.getDate();
        this.saturday = this.rightDay.getDate();
        this.currentMonth = this.rightDay.getMonth() + 1;
    }

    //GetLeftDay(): number {
    //    this.leftDay.setDate(this.currentDate.getDate() - ((this.currentDate.getDay()+1) - 1));
    //    return this.leftDay.getDate();
    //}

    //GetRightDay(): number {
    //    this.rightDay.setDate(this.currentDate.getDate() + (7 - (this.currentDate.getDay()+1)));
    //    return this.rightDay.getDate();
    //}
}

