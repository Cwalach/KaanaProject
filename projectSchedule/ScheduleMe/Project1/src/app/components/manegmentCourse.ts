import { Component, NgModule, Input, Output, EventEmitter, NgZone } from "@angular/core"
import { Router } from "@angular/router"
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
        private router: Router,
        private modalService: ModalService, private zone: NgZone) {
        this.GetCourse();
        this.btnCourse = true;
    }
    ngOnInit() {
        this.courseService.getNewCourse().subscribe((item: Course) =>
        {
            this.courseList.push(item);
        })
    }

    GetCourse() {
        this.courseService.GetCoursesFromServer().
            subscribe(data => {
                this.zone.run(() => {  this.courseList = data  });
            }, error => { console.log("error"); });
    }
    newCourse() {
        const modalData = new ModalData();
        modalData.component = CourseDetails;
        modalData.modalHeight = 500;
        modalData.modalWidth = 500;
        this.modalService.openModal(modalData);
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
        this.courseService.removeCourseFromServer(item).subscribe(data => { }, error => { console.log("error"); });
    }
    saveToServer(item: Course) {
        this.courseService.saveCourseToServer(item).
            subscribe(data => { }, error => { console.log("error"); });
    }
    clickEvent(id: string) {
        if (id == 'btnCourse') {
            this.btnCourse = true;
            this.btnGroup = false;
            this.btnDays = false;
            this.router.navigate(['Try/manage/manegmentCourse']);
        }
        else {
            if (id == 'btnGroup') {
                this.btnCourse = false;
                this.btnGroup = true;
                this.btnDays = false;
                this.router.navigate(['Try/manage/manegmentGroup']);
            }
            else {
                if (id == 'btnDays') {
                    this.btnCourse = false;
                    this.btnGroup = false;
                    this.btnDays = true;
                    this.router.navigate(['Try/manage/NonActiveDays']);

                }
            }
        }
    }
}