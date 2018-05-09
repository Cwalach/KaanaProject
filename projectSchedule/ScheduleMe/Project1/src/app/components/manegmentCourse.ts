import { Component, NgModule } from "@angular/core"
import { CourseDetails } from "../components/course-details"
import { Course } from "../models/course"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { ManegmentCoursesService } from "../Services/manegmentCourses-service"
@Component({
    templateUrl: "./src/app/components/manegmentCourse.html",
    selector: "Courses"
})
export class ManegmentCourse {
    courseList: Course[];
    currentCourse: Course;
    constructor(private courseService: ManegmentCoursesService) {
    }
    GetCourse() {
        this.courseService.GetCoursesFromServer().
            subscribe(data => { this.courseList = data }, error => { alert("error!"); });
    }
    EditCourse(item: Course) {

        this.currentCourse = item;
    }
    removeCourse(item: Course) {
        var index = this.courseList.indexOf(item);
        this.courseList.splice(index, 1);
        //שמירה בשרת
        this.courseService.removeCourseFromServer(item).subscribe(data => { alert("נמחק") }, error => { alert("שגיאה")});
    }
    saveToServer(item: Course) {
        this.courseService.saveCourseToServer(item).subscribe(data => { alert("נשמר") }, error => { alert("לא נשמר:(") });
    }
}