import { Injectable } from "@angular/core"
import { Course } from "../models/course"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
@Injectable()
export class ManegmentCoursesService {
    constructor(private http: Http) {
    }
    GetCoursesFromServer(): Observable<Course[]> {
        return this.http.get("api/Course/Get").map(
            data => {
                return data.json() as Course[]
            });
    }
    saveCourseToServer(courseToSave: Course): Observable<boolean> {
        return this.http.post("api/Course/Post", courseToSave).map(res => { return true; });
    }
    removeCourseFromServer(courseToRemove: Course): Observable<boolean> {
        return this.http.post("api/Course/RemoveCourse/" + courseToRemove, courseToRemove).map(res => { return true; });
    }
}