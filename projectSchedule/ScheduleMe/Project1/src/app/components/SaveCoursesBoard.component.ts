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
    public date;
    dateToPost: Date;
    btnSave: boolean = false;
    btnSaveChange: boolean = false;
    btnEndSave: boolean = false;
    isChecked: boolean;
    listExistingCourse: ExistingCourse[];
    comments: string;
    valid: boolean = true;
    SaveChanges() {
        this.btnSave = false;
        this.btnSaveChange = true;
        this.listExistingCourse=this.ScheduleBoardStateManager.GetAllExistingCourseThatWasChanged();
        this.existingCoursesService.save(this.listExistingCourse, this.dateToPost, this.comments).subscribe(data => { alert("Saved succsessed!!!") });
    
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
            this.dateToPost = this.date;
            return this.date;
        } else {
            return null;
        }
    }
    SetChecked() { 
        this.isChecked= true;
    }
    ThisWeekUntil() {
       
        this.dateToPost = new Date("12-12-18");
    }
}
