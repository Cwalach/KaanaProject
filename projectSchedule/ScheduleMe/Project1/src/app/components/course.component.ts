import { Component, Input, Output, EventEmitter } from "@angular/core"
import { SaveChangesBoardService } from "../Services/SaveChangesBoardService"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"

@Component({
    templateUrl: "./src/app/components/course.component.html",
    selector: "CourseStart"
})
export class CourseComponent {

    constructor(private scheduleService: SaveChangesBoardService) {
        this.IsChange = false;
        this.scheduleService.getAllCoursesFromService().subscribe(data => { this.CourseList = data }, error => { });
        this.scheduleService.AllGroupesFromService().subscribe(data => { this.GroupList = data }, error => { });
    }


    @Input()
    CourseList: Course[];
    GroupList: Group[];
    CurrentCourse: Course;
    CurrentGroup: Group;
        CurrentComponentId: number;
    CurrentExistingCourses: ExistingCourse;
    namecourse: string;
    flag = true;
    IsChange: boolean;
    

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
        this.flag = true;
     
    }
    onChange(selectCourses) {
        var options = selectCourses.list.options;
        for (let eachObj of options) {
            if (selectCourses.value == eachObj.value){
                alert(eachObj.id);
                this.CurrentCourse = this.CourseList.find(c => c.Id == eachObj.id);
            }
        };
        
        this.IsChange = true; 
        this.namecourse = this.CurrentCourse.Instructor+" - "+this.CurrentCourse.Name;
        this.CurrentExistingCourses = new ExistingCourse(15, new Date("1999,1,1"), this.CurrentCourse, this.CurrentGroup);
        this.CurrentExistingCourses.CourseId = this.CurrentCourse.Id;
        this.CurrentExistingCourses.GroupId = this.CurrentGroup.Id;
        this.scheduleService.AddExistingCourseThatWasChangedToList(this.CurrentExistingCourses);
    }
    onChangeGroup(Group)
    {

        this.CurrentGroup = this.GroupList.find(g => g.Id == Group);
        alert(this.CurrentGroup.Id);
        alert(this.CurrentGroup.Name);
    }
}