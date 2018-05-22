import { Component, Output, Input, EventEmitter } from "@angular/core"
import { WeeklyScheduleService } from "../Services/WeeklyScheduleService"
import { CourseInSchedule } from "../components/courseInSchedule"
import { ExistingCourse } from "../models/ExistingCourses"
import { Group } from "../models/Group"
@Component({
    templateUrl: "./src/app/components/scheduleBoard.html",
    selector: "scheduleBoard"
})
export class scheduleBoard {
    date: Date;
    d: Date = new Date();
    dayInWeek: string[];
    Courses: ExistingCourse[];
    Groups: Group[];
    CurrentCourse: ExistingCourse;
    constructor(private weeklyScheduleService: WeeklyScheduleService) {
        this.weeklyScheduleService.GetAllExistingCoursesFromServer().subscribe(data => { this.Courses = data }, error => { });
        this.weeklyScheduleService.GetAllGroupsFromServer().subscribe(data => { this.Groups = data }, error => { });
        this.dayInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        this.date = new Date();
    }
    getday(i: number): number {
        this.d.setDate(this.date.getDate() - ((this.date.getDay() + 1) - (i + 1)));
        return this.d.getDate();
    }
    //להוסיף את השורה למטה לפרמטרים שהפונקציה למטה מקבלת
    //groupId: number,
    getCourseName(day: number, lesson: number): string {
        //לעשות בדיקת תקינות שישנו כזה קורס
        this.CurrentCourse = this.Courses.find(c => /*c.GroupId == groupId &&*/(c.Date.getDay() + 1) == day && c.OrderNumber == lesson);
        return this.CurrentCourse.Course.Name;
    }
    getGroupName(i: number): string {
        return this.Groups[i+1].Name;
    }
}