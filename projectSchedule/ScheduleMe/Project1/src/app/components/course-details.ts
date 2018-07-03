import { Component, Output, Input, Injectable, EventEmitter } from "@angular/core"
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
        if (item.Name != null || item.Instructor != null) {
            this.courseService.saveCourseToServer(item).
                subscribe(data => { alert("נשמר") }, error => { alert("לא נשמר:(") });
        }
        else {
            this.title = "אין אפשרות לשמור";
        }
    }
    @Output()
    onClose: EventEmitter<Course> = new EventEmitter<Course>();

    cancelChanges() {
        if (this.course.Id != null) {
            this.course.Name = this.backup.Name;
            this.course.Instructor = this.backup.Instructor;
        }
        this.onClose.emit();
    }
}