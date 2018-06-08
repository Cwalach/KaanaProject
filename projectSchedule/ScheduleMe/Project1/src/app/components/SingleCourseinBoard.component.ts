import { Component, Input, Output, EventEmitter } from "@angular/core"
import { SaveChangesBoardService } from "../Services/SaveChangesBoardService"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"

@Component({
    templateUrl: "./src/app/components/course.component.html",
    selector: "Course_Component"
})
export class CourseComponent {

    constructor(private scheduleService: SaveChangesBoardService) {
        this.IsChange = false;
        this.scheduleService.getAllCoursesFromService().subscribe(data => { this.CourseList = data }, error => { });
        this.scheduleService.AllGroupesFromService().subscribe(data => { this.GroupList = data }, error => { });
    }

    @Input()
    CurrentDateOfSun: Date;
    CurrentDateOfToday: Date;
    CourseList: Course[];
    GroupList: Group[];
    CurrentCourse: Course;
    @Input()
    CurrentGroup: Group;
    @Input()
    CurrentComponentId: number;
    CurrentExistingCourses: ExistingCourse;
    namecourse: string;
    flag = true;
    IsChange: boolean;
    Dayinweek: number;


    EditCourse() {
        if (this.flag)
            this.flag = false;
        else
            this.flag = true;
        //this.flag == true ? false : true;
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
        //this.SetDateForEachDayInWeek();
        this.IsChange = true;
        //this.CurrentExistingCourses = new ExistingCourse(15, this.CurrentDateOfSun, this.CurrentCourse, this.CurrentGroup);
        //this.CurrentExistingCourses.CourseId = this.CurrentCourse.Id;
        //this.CurrentExistingCourses.GroupId = this.CurrentGroup.Id;
        //this.scheduleService.AddExistingCourseThatWasChangedToList(this.CurrentExistingCourses);
    }
    SetDateForEachDayInWeek() {
        this.CurrentDateOfToday = this.CurrentDateOfSun;
        this.Dayinweek = 1 + (this.CurrentComponentId - 1);
        this.CurrentDateOfToday.setDate(this.CurrentDateOfSun.getDate() + this.Dayinweek -1);
    }
    //onChangeGroup(Group)
    //{
    //    this.CurrentGroup = this.GroupList.find(g => g.Id == Group);
    //}
}