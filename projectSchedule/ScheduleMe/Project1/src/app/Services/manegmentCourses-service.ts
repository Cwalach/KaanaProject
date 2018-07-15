import { Injectable } from "@angular/core"
import { Course } from "../models/course"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ManegmentCoursesService {

    listCourse: Course;
    private course = new Subject<any>();


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
    newCourse(newCourse: Course): Observable<boolean> {
        return this.http.post("api/Course/AddCourse/" + newCourse, newCourse).map(res => { return true; });
    }

    addCourse(newcourse: Course) {
        this.course.next({ course: newcourse });
    }

    getNewCourse(): Observable<any> {
        return this.course.asObservable();
    }

}