import { Component } from "@angular/core"
import { Course } from "../models/Course"
import { ExistingCourse } from "../models/ExistingCourses"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { ReportDetailsService } from "../Services/ReportDetailsService"
import { ReportDetails } from "../models/ReportDetails"


@Component({
    templateUrl: "./src/app/components/ReportDetails.component.html",
    selector: "ReportDetails"
})


export class ReportDetailsComponent {
    //list: ReportDetailsCs[];
    ReportDeatilsList: ReportDetails[];
    CourseList: Course[];
    //existingCourse: Course[];
    CurrentCourse: Course;
    public date1: Date;
    public date2: Date;
    constructor(private ReportDetailsList: ReportDetailsService) {
        this.ReportDetailsList.GetCoursesFromServer().subscribe(data => { this.CourseList = data }, error => { alert("errorComboBox!"); });
    }

    //GetAllCourses() {
    //    this.Courses.GetCourseFromServer().subscribe(data => { this.CourseList = data }, error => { alert("error!"); });
    //}

    GetCourseName(i: number): string {
        return this.ReportDeatilsList[i].Name;
    }


    //GetReport(): ReportDetailsCs[] {//הצג
    //    this.ReportDetailsList.GetReportDetailsFromServer().subscribe
    //        (data => { this.ReportDeatils = data }, error => { alert("error!"); });
    //    return this.ReportDeatils;
    //}

   
    GetReportCourseByComboBox(selectedCourse) {//combo box selected
        var options = selectedCourse.list.options;
    for (let eachObj of options) {
        if (selectedCourse.value == eachObj.value) {
            alert(eachObj.id);
            this.CurrentCourse = this.CourseList.find(c => c.Id == eachObj.id);
        }
    }
 };


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
    //, dateEnd: string, reportDetailsCs: ReportDetailsCs
    parseDate(dateString: string): Date {
        if (dateString)
        {
            //alert(dateString);
            return new Date(dateString);
        }
        else
        {
            return null;
        }
    }

    GetReport1(date1: Date,date2: Date): void {
        this.ReportDetailsList.GetReportDetailsFromServer(date1,date2).subscribe
            (data => { this.ReportDeatilsList = data }, error => { alert("erroraaa!"); });
    }


    //pac(selectedCourse):void
    //{
    //    selectedCourse.filter(obj => {
    //        obj._id = obj.id // You might want to save original id
    //        obj.id = obj;
    //        if (obj.id == selectedCourse.id)
    //        {
    //            alert("hhhhh");
    //        }
    //    });
        
    //}
}
