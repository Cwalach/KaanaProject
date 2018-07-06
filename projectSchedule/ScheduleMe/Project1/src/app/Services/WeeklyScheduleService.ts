import { Injectable,QueryList } from "@angular/core"
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
        return this.http.get("api/WeeklySchedule/GetExistingCourses").map(
            data => {
                return data.json() as ExistingCourse[]
            });
    }

    public GetAllCoursesFromServer(): Observable<Course[]> {
        return this.http.get("WeeklySchedule/GetCourses").map(
            data => {
                return data.json() as Course[]
            });
    }

    public GetAllGroupsFromServer(): Observable<Group[]>
    {
        return this.http.get("WeeklySchedule/GetGroups").map(
            data => {
                return data.json() as Group[]
            });
    }

    public GetAllExistingCoursesForWeekFromServer(snudayOfWeek: Date, selectedGroup: Group): Observable<ExistingCourse[][]>
    {
        return this.http.get("api/WeeklySchedule/GetExistingCoursesForWeek/" + snudayOfWeek.toDateString() + "/" + selectedGroup.Id)
            .map(data => {
                return data.json() as ExistingCourse[][]
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(error);
    }
}