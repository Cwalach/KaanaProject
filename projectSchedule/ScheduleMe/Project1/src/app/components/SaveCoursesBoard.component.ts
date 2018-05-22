import { Component } from "@angular/core"
import { ScheduleService} from "../Services/ScheduleService"
@Component({
    templateUrl: "./src/app/components/SaveCoursesBoard.component.html",
    selector: "SaveCoursesBoard"
})
export class SaveCoursesBoard {
    constructor(private ScheduleService: ScheduleService) { }
    public date: Date;
    btnSave: boolean = false;
    btnSaveChange: boolean = false;
    Save() {
        this.btnSave = true;
    }
    SaveChanges() {
        this.btnSave = false;
        this.btnSaveChange = true;
        //להעביר נתונים לשמירה -איך מנתבים
        //this.ScheduleServic
        // לחפש על  לחצני הרדיו
    }
    CancelProcess() {
        this.btnSaveChange = false;
    }

    parseDate(dateString: string): Date {
        if (dateString) {
            alert(dateString + " is selected");
            this.date = new Date(dateString);
            return this.date;
        } else {
            return null;
        }
    }
}
