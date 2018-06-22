import { Component, NgModule, Input, Output, EventEmitter } from "@angular/core"
import { CourseDetails } from "../components/course-details"
import { Course } from "../models/course"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { ManegmentCoursesService } from "../Services/manegmentCourses-service"
import { DialogOptions, DialogService } from "ng2-bootstrap-modal";
import { ModalData } from './modal/models/modal-data'
import { ModalService } from './modal/services/modal'
@Component({
    templateUrl: "./src/app/components/manegmentCourse.html",
    selector: "Courses"
})
export class ManegmentCourse {
    courseList: Course[];
    currentCourse: Course;
    btnCourse: boolean = false;
    btnGroup: boolean = false;
    btnDays: boolean = false;

    constructor(private courseService: ManegmentCoursesService,
        private modalService: ModalService) {
        this.GetCourse();
        this.btnCourse = true;
    }
    GetCourse() {
        this.courseService.GetCoursesFromServer().
            subscribe(data => { this.courseList = data }, error => { alert("error!"); });
    }
    newCourse() {
        //this.currentCourse = null;
        const modalData = new ModalData();
        modalData.component = CourseDetails;
        modalData.modalHeight = 500;
        modalData.modalWidth = 500;
        //modalData.options = this.currentCourse;
        this.modalService.openModal(modalData);

        //const newC = new Course(1,);
        ////this.courseService.newCourse()
    }
    EditCourse(item: Course) {
        this.currentCourse = item;
        const modalData = new ModalData();
        modalData.component = CourseDetails;
        modalData.modalHeight = 500;
        modalData.modalWidth = 500;
        modalData.options = this.currentCourse;
        this.modalService.openModal(modalData);
    }
    removeCourse(item: Course) {
        var index = this.courseList.indexOf(item);
        this.courseList.splice(index, 1);
        //שמירה בשרת
        this.courseService.removeCourseFromServer(item).subscribe(data => { alert("נמחק") }, error => { alert("שגיאה") });
    }
    saveToServer(item: Course) {
        this.courseService.saveCourseToServer(item).
            subscribe(data => { alert("נשמר") }, error => { alert("לא נשמר:(") });
    }
    clickEvent(id: string) {
        if (id == 'btnCourse') {
            this.btnCourse = true;
            this.btnGroup = false;
            this.btnDays = false;
        }
        else {
            if (id == 'btnGroup') {
                this.btnCourse = false;
                this.btnGroup = true;
                this.btnDays = false;
            }
            else {
                if (id == 'btnDays') {
                    this.btnCourse = false;
                    this.btnGroup = false;
                    this.btnDays = true;
                }
            }
        }
    }
}