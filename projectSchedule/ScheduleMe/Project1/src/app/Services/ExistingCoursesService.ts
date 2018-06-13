import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { ExistingCourse } from "../models/ExistingCourses"

@Injectable()
export class ExistingCoursesService {
    //מערך הקורסים שהשתנו
    public ExistingCoursesThatWasChangedList: Array<ExistingCourse>;

    constructor(private http: Http) {
    }

    //Post
    save(ExistingCourseArr: Array<ExistingCourse>, DateToUpdate: Date,Comments:string): Observable<boolean> {
        return this.http.post("api/Schedule/" + DateToUpdate.toDateString() + "/" + Comments, ExistingCourseArr).map(res => { return true; });
         //return this.http.post("api/Schedule/Post", ExistingCoursearr).map(res => { return true; });

      }
    }
