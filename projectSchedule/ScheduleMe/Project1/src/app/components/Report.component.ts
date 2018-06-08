import { Component } from "@angular/core"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { PrintHtmlService } from "../Services/PrintHtmlService"

@Component({
    templateUrl: "./src/app/components/Report.component.html",
    selector: "Report"

})
export class ReportComponent {

    ListExistingCourseFromServer: ExistingCourse[];
    constructor(private printHtmlService: PrintHtmlService) {

}
    //ListExistingCourse: ExistingCourse[];
    GetReport(): ExistingCourse[]{          
        this.ListExistingCourseFromServer = [
            new ExistingCourse(1, new Date(2018, 11, 24, 10, 33, 30, 0), new Course(1, "משה", "C#"), new Group(1, "הנדסת תוכנה שנה א")),
            new ExistingCourse(2, new Date(2018, 1, 24, 10, 33, 30, 0), new Course(2, "דויד", "java"), new Group(2, "תכנות"))
        ]
        return this.ListExistingCourseFromServer; 
    }   
    Print_Html(): void {
        this.printHtmlService.printHtml(document.getElementById('print-section').innerHTML);
   }
   
}