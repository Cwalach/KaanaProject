import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { Course } from "../models/Course"
import { ExistingCourse } from "../models/ExistingCourses"

@Injectable()
export class SaveChangesBoardService {
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

    //Post
    saveAllCoursesToService(): Observable<boolean> {
        return this.http.post("api/Schedule/Post", this.ExistingCoursesThatWasChangedList).map(res => { return true; });

    }
    }
