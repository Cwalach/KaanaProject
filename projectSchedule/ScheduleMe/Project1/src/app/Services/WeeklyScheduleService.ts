import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { Course } from "../models/Course"
import { ExistingCourse } from "../models/ExistingCourses"
import { Group } from "../models/Group"

@Injectable()
export class WeeklyScheduleService {
    constructor(private http: Http) {
    }
    public GetAllExistingCoursesFromServer(): Observable<ExistingCourse[]>
    {
        return this.http.get("ExistingCourses").map(
            data => {
                return data.json() as ExistingCourse[]
            });
    }
    public GetAllGroupsFromServer(): Observable<Group[]>
    {
        return this.http.get("api/WeeklySchedule/Get").map(
            data => {
                return data.json() as Group[]
            });
    }
}