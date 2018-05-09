import { Component } from "@angular/core"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"

@Component({
    templateUrl: "./src/app/components/Report.component.html",
    selector: "Report"

})
export class ReportComponent {

    ListExistingCourseFromServer : ExistingCourse[];
    
    //ListExistingCourse: ExistingCourse[];
    GetReport(): ExistingCourse[]{          
        this.ListExistingCourseFromServer = [
            new ExistingCourse(1, new Date(2018, 11, 24, 10, 33, 30, 0), new Course(1, "משה", "C#"), new Group(1, "הנדסת תוכנה שנה א")),
            new ExistingCourse(2, new Date(2018, 1, 24, 10, 33, 30, 0), new Course(2, "דויד", "java"), new Group(2, "תכנות"))
        ]
        return this.ListExistingCourseFromServer; 
    }   
   Print_Html(): void {
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