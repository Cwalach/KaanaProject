﻿import { Component, Output, Input, EventEmitter , ViewChild , AfterViewInit } from "@angular/core"
import { WeeklyScheduleService } from "../Services/WeeklyScheduleService"
import { CourseInSchedule } from "../components/courseInSchedule"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { DateRangeSelectorComponent } from "./dateRangeSelector.component"

@Component({
    templateUrl: "./src/app/components/scheduleBoard.html",
    selector: "scheduleBoard"
})
export class scheduleBoard {
    date: Date;
    DateTimeCurrently: Date;
    d: Date = new Date();
    dayInWeek: string[];
    Groups: Group[];
    //SelectedGroup: Group;
    ExistingCourses: ExistingCourse[];
    CurrentExistingCourse: ExistingCourse;
    Courses: Course[];
    CurrentCourse: Course;
    CurrentGroup: Group;
    GroupList: Group[];
    constructor(private weeklyScheduleService: WeeklyScheduleService) {
        this.weeklyScheduleService.GetAllCoursesFromServer().subscribe(data => { this.Courses = data }, error => { alert("error!"); });
        this.weeklyScheduleService.GetAllExistingCoursesFromServer().subscribe(data => { this.ExistingCourses = data }, error => { alert("error!"); });
        this.weeklyScheduleService.GetAllGroupsFromServer().subscribe(data => { this.Groups = data }, error => { alert("error!"); });
        this.weeklyScheduleService.GetAllGroupsFromServer().subscribe(data => { this.GroupList = data }, error => { });

        this.dayInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        this.date = new Date();
        this.DateTimeCurrently = new Date();
    }
    getday(i: number): number {
        this.d.setDate(this.date.getDate() - ((this.date.getDay() + 1) - (i + 1)));
        return this.d.getDate();
    }
    //להוסיף
    //, day: number
    //לבדוק מה הבעיה עם התאריך
    getExistingCourseName(group: number, lesson: number): string {
        //לעשות בדיקת תקינות שישנו כזה קורס
        this.CurrentExistingCourse = this.ExistingCourses.find(c => c.GroupId == group /*&& c.Date.getDay() == day*/ && c.OrderNumber == lesson);
        if (this.CurrentExistingCourse != undefined)
            return this.CurrentExistingCourse.Course.Name;
        return "Undefined";
    }
    getCourseNameById(id: number): string {
       this.CurrentCourse = this.Courses.find(c => c.Id == id);
       if (this.CurrentCourse != undefined)
           return this.CurrentCourse.Name;
       return "Undefined";
    }
    //למחוק את הפונקציה הנל בהמשך
    p(day: number, lesson: number): any {
        this.CurrentExistingCourse = this.ExistingCourses.find(c => /*c.GroupId == groupId &&*/(c.Date.getDay() + 1) == day && c.OrderNumber == lesson);
        alert(this.CurrentExistingCourse.Course.Name);
    }
    getGroupName(i: number): string {
        return this.Groups[i + 1].Name;
    }
    ChangeTable(selectedGroup: Group): any {
        //this.SelectedGroup = selectedGroup;
        //שינוי-עדכון הטבלה בעת בחירת קבוצה
        //html-איך אני עוברת על הטבלה - איך תופסים אלמנט מה
        //return this.GroupList[i+1].Name;
    }
    onChangeGroup(Group) {
        this.CurrentGroup = this.GroupList.find(g => g.Id == Group);
    }
    @ViewChild(DateRangeSelectorComponent)
    private dateTimeCurrentlyFromComponent: DateRangeSelectorComponent;

    ngAfterViewInit() {
        setTimeout(this.date = this.dateTimeCurrentlyFromComponent.currentDate, 0);
        this.DateTimeCurrently = this.dateTimeCurrentlyFromComponent.leftDay;
    }
}