import { Component,Output,Input,Injectable } from "@angular/core"
import { Course } from "../models/course"

@Component({
    templateUrl: "./src/app/components/course-details.html",
    selector:"course-details"
})
export class CourseDetails
{
    @Input()
    course: Course;

    c: Course;
    nameCourse: string;
    constructor() {
        //this.c = new Course();
        //this.c.id = 1;
        //this.c.name = "aaaaaaa";
        //alert(this.c.id + "    " + this.c.name);
        //alert(this.course);
    }

}