import { Component, Input, Output, EventEmitter } from "@angular/core"
import { SaveChangesBoardService } from "../Services/SaveChangesBoardService"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { ScheduleBoardStateManager } from '../Services/ScheduleBoardStateManager'

@Component({
    templateUrl: "./src/app/components/SingleCourseinBoard.component.html",
    selector: "SingleCourseinBoard_Component"
})
export class SingleCourseinBoardComponent {
    constructor(private scheduleService:SaveChangesBoardService,private ScheduleBoardStateManager: ScheduleBoardStateManager) {
        this.scheduleService.getAllCoursesFromService().subscribe(data => { this.CourseList = data }, error => { });
        //this.ScheduleBoardStateManager.getAllCoursesFromService().subscribe(data => { this.CourseList = data }, error => { });
        //this.scheduleService.AllGroupesFromService().subscribe(data => { this.GroupList = data }, error => { });
        if (this.CurrentCourse == null)
            this.namecourse = "";
        else
            this.namecourse = this.CurrentCourse.Name;
    }

    @Input()
    CurrentDateOfSun: Date;
    CurrentDateOfToday = new Date();
    CourseList: Course[];
    //GroupList: Group[];
    CurrentCourse: Course;
    @Input()
    CurrentGroup: Group;
    @Input()
    CurrentComponentOrder: number;
    @Input()
    CurrentDayInWeek: number;
    CurrentExistingCourses: ExistingCourse;
    @Input()
    namecourse: string;
    flag = true;
    IsChange = false;


    EditCourse() {
        if (this.flag)
            this.flag = false;
        else
            this.flag = true;
        this.IsChange = false;
    }
    RemoveCourse(course: Course) {
        this.flag = true;
        this.CurrentCourse = null;
        this.namecourse = "";
    }
    SaveCourse(course: Course, selectCourses) {
        this.namecourse = this.CurrentCourse.Instructor + "-" + this.CurrentCourse.Name;
        this.flag = true;
    }

    onChange(selectCourses) {
        var options = selectCourses.list.options;
        for (let eachObj of options) {
            if (selectCourses.value == eachObj.value) {
                this.CurrentCourse = this.CourseList.find(c => c.Id == eachObj.id);
            }
        };
        this.SetDateForEachDayInWeek();
        this.IsChange = true;
        this.CurrentExistingCourses = new ExistingCourse(this.CurrentComponentOrder, this.CurrentDateOfToday, this.CurrentCourse, this.CurrentGroup);
        this.CurrentExistingCourses.CourseId = this.CurrentCourse.Id;
        this.CurrentExistingCourses.GroupId = this.CurrentGroup.Id;
        this.scheduleService.AddExistingCourseThatWasChangedToList(this.CurrentExistingCourses);
        //this.ScheduleBoardStateManager.AddExistingCourseThatWasChangedToList(this.CurrentExistingCourses);

    }
    SetDateForEachDayInWeek() {
        this.CurrentDateOfToday.setFullYear(this.CurrentDateOfSun.getFullYear(), this.CurrentDateOfSun.getMonth(), this.CurrentDateOfSun.getDate());
        this.CurrentDateOfToday.setDate(this.CurrentDateOfToday.getDate() + this.CurrentDayInWeek);
    }

}