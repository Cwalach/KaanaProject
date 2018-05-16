import { Component } from "@angular/core"
import { ExistingCourse } from "../models/ExistingCourses"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { ReportDetailsService } from "../Services/ReportDetailsService"


@Component({
    templateUrl: "./src/app/components/ReportDetails.html",
    selector: "ReportDetails"
})


export class ReportDetails
{
    ExistingCourseList: ExistingCourse[];
    constructor(private ExistingCourse: ReportDetailsService) {
        }
    GetAllCourses(){
        this.ExistingCourse.GetExistingCourseFromServer().
        subscribe(data => { this.ExistingCourseList = data }, error => { alert("error!"); });
       
    }

    //GetReport(): ExistingCourse[] {//הצג
    //    this.ExistingCourseList = [
    //        new ExistingCourse(1, new Date(2018, 11, 24, 10, 33, 30, 0), new Course(1, "משה", "C#"), new Group(1, "הנדסת תוכנה שנה א")),
    //        new ExistingCourse(2, new Date(2018, 1, 24, 10, 33, 30, 0), new Course(2, "דויד", "java"), new Group(2, "תכנות"))
    //    ]
    //    return this.ExistingCourseList;
    //}

    Print_Html(): void {//מחגית חרזי הדפס
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
    table{
        border:solid;
    }
    td{
    padding: 3px;
    border-style: solid;
    border-width: thin;
    width: 14vw;
    text-align: center;
    }
    .headerTableReport{
        font-weight:bold;
    }
    .ToShow{
        text-align:center;      
       margin:1vw;
    }
</style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }
}
