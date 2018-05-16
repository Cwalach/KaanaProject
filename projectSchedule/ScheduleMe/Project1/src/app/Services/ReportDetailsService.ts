import { Injectable } from "@angular/core"
import { ExistingCourse } from "../models/ExistingCourses"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
@Injectable()
export class ReportDetailsService {
    constructor(private http: Http) {
    }
    GetExistingCourseFromServer(): Observable<ExistingCourse[]> {
        return this.http.get("api/ExistingCourse/Get").map(
            data => {
                return data.json() as ExistingCourse[]
            });
    }

}