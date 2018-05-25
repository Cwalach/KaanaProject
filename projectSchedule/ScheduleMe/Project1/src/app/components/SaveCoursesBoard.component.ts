import { Component } from "@angular/core"
import { ExistingCourse } from "../models/ExistingCourses"
import { ScheduleBoardStateManager } from "../Services/ScheduleBoardStateManager"
import { ExistingCoursesService} from "../Services/ExistingCoursesService"
@Component({
    templateUrl: "./src/app/components/SaveCoursesBoard.component.html",
    selector: "SaveCoursesBoard"
})
export class SaveCoursesBoard {
    constructor(private ScheduleBoardStateManager: ScheduleBoardStateManager, private existingCoursesService: ExistingCoursesService) { }
    public date: Date;
    btnSave: boolean = false;
    btnSaveChange: boolean = false;
    btnEndSave: boolean = false;
    listExistingCourse: ExistingCourse[];
    Save() {
        this.btnSave = true;
    }
    SaveChanges() {
        this.btnSave = false;
        this.btnSaveChange = true;
         this.listExistingCourse=this.ScheduleBoardStateManager.GetAllExistingCourseThatWasChanged();
         this.existingCoursesService.save(this.listExistingCourse).subscribe(data => { alert("Saved succsessed!!!") });
    }
    CancelProcess() {
        this.btnSaveChange = false;
    }
    EndSave() {
        this.btnSaveChange = false;
        this.btnEndSave = true;
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
