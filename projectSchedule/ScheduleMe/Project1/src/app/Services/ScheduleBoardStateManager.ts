import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { ExistingCourse } from "../models/ExistingCourses"

@Injectable()
    //ScheduleBoardStateManager
export class ScheduleBoardStateManager {
    //מערך הקורסים שהשתנו
    public ExistingCoursesThatWasChangedList: Array<ExistingCourse>;

    constructor(private http: Http) {
    }
    //הוספת שינוי קורס למערך
    AddExistingCourseThatWasChangedToList(existingCourses: ExistingCourse): any
    {
        this.ExistingCoursesThatWasChangedList.push(existingCourses);
    }
    //קבלת מערך השיוניים
    GetAllExistingCourseThatWasChanged(): Array<ExistingCourse>
    {
        //return [
        //    {
        //        Id: 1, Date: new Date("2017/12/01",), OrderNumber: 1, CourseId: 2,GroupId: 1,
        //        Course: new Course(1, "aaa", "Chani"), Group: new Group(1, "Computer"),Comments:"None"
        //    }

        //]
        return this.ExistingCoursesThatWasChangedList;
    }
   
    //מחיקת מערך השינויים לאחר שכל השינויים התעדכנו
    ClearExistingCoursesThatWasChangeList(any): any
    {
        //לבדוק דרך קצרה יותר
        this.ExistingCoursesThatWasChangedList.splice(0, this.ExistingCoursesThatWasChangedList.length);
    }
    //בדיקה אם המערך ריק
    ISExistingCoursesThatWasChangeListEmpty(any): boolean
    {
        return this.ExistingCoursesThatWasChangedList.length > 0 ? true : false;
    }
    //Get
    getAllCoursesFromService(): Observable<Course[]> {
        this.ExistingCoursesThatWasChangedList = new Array<ExistingCourse>();
        return this.http.get("api/Schedule/Get").map(res => { return res.json() as Course[] });
       
    }
    AllGroupesFromService(): Observable<Group[]> {
        return this.http.get("api/Schedule/AllGroups").map(res => { return res.json() as Group[] });
    }
    //Post
    saveAllCoursesToService(): Observable<boolean> {
         return this.http.post("api/Schedule/Post", this.ExistingCoursesThatWasChangedList).map(res => { return true; });

      }
    }
