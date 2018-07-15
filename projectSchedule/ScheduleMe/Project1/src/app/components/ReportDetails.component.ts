import { Component } from "@angular/core"
import { Course } from "../models/Course"
import { Group } from "../models/group"
import { ExistingCourse } from "../models/ExistingCourses"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { ReportDetailsService } from "../Services/ReportDetailsService"
import { ReportDetails } from "../models/ReportDetails"
import { PrintHtml } from "./PrintHtmlComponent"

@Component({
    templateUrl: "./src/app/components/ReportDetails.component.html",
    selector: "ReportDetails"
})


export class ReportDetailsComponent {
    ReportDeatilsList: ReportDetails[];
    CourseList: Course[];
    GroupList: Group[];
    CurrentCourse: Course;
    public date1: Date;
    public date2: Date;
    selectedCourse:string = '';
    constructor(private ReportDetailsList: ReportDetailsService) {
        this.ReportDetailsList.GetCoursesFromServer().subscribe(data => {
            this.CourseList = data;
            this.selectedCourse = this.CourseList[0].Name;
        }, error => {  });
    }


    GetCourseName(i: number): string {
        return this.ReportDeatilsList[i].Name;
    }
    GetReportCourseByComboBox($event) {
        console.log(this.selectedCourse);
       
    }

    parseDate(dateString: string): Date {
        if (dateString)
        {
            return new Date(dateString);
        }
        else
        {
            return null;
        }
    }

    GetReport1(date1: Date, date2: Date, courseName: string): void {
        this.ReportDetailsList.GetReportDetailsFromServer(date1,date2,courseName).subscribe
            (data => { this.ReportDeatilsList = data }, error => {  });
    }
}
