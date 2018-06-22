import { Component, Output, Input, Injectable } from "@angular/core"
import { Course } from "../models/course"
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Http } from "@angular/http"
import { ManegmentCoursesService } from "../Services/manegmentCourses-service"
export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    templateUrl: "./src/app/components/course-details.html",
    selector: "course-details"
})
export class CourseDetails
    extends DialogComponent<ConfirmModel, boolean>
    implements ConfirmModel {
    @Input()
    course: Course;

    title: string;
    message: string;

    backup: Course;
    nameCourse: string;

    constructor(dialogService: DialogService,
        private courseService: ManegmentCoursesService) {
        super(dialogService);
        if (this.course == null)
            this.course = new Course();
    }

    public initModalProperties = (data) => {
        if (data) {
            this.course = data;
            this.backup = this.course;
        }
    }

    saveToServer(item: Course) {
        this.courseService.saveCourseToServer(item).
            subscribe(data => { alert("נשמר") }, error => { alert("לא נשמר:(") });
    }

    cancelChanges() {
        this.course.Name = this.backup.Name;
        this.course.Instructor = this.backup.Instructor;
        this.close();
    }
}