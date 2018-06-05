import { Injectable } from "@angular/core"
import { Course } from "../models/Course"
import { ReportDetails } from "../models/ReportDetails"
import { ExistingCourse } from "../models/ExistingCourses"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
@Injectable()
export class ReportDetailsService {
    constructor(private http: Http) {
    }
    //id: number
    GetReportDetailsFromServer(startDate: Date, endDate: Date): Observable<ReportDetails[]> {
        return this.http.get("api/Report/GetReportDetails/" + startDate.toDateString() + "/" + endDate.toDateString()).map(
            data => {
                return data.json() as ReportDetails[]
            });
    }
    GetCoursesFromServer(): Observable<Course[]> {
        return this.http.get("api/Report/GetCourses").map(
            data => {
                return data.json() as Course[]
            });
    }
   
    
}