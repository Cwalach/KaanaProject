import { Component,QueryList, Output, Input, EventEmitter, AfterViewInit, ViewChild, ViewChildren } from "@angular/core"
import { WeeklyScheduleService } from "../Services/WeeklyScheduleService"
import { CourseInSchedule } from "../components/courseInSchedule"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { DateRangeSelector } from "../components/dateRangeSelector.component"
import { UpdateScheduleBoard } from "../Services/UpdateScheduleBoard"
import { SingleCourseinBoardComponent} from "../components/SingleCourseinBoard.component"

@Component({
    templateUrl: "./src/app/components/scheduleBoard.html",
    selector: "scheduleBoard"
})
export class ScheduleBoard {
    date: Date;
    DateTimeCurrently: Date;
    d: Date = new Date();
    dayInWeek: string[];
    GroupList: Group[];
    ExistingCourses: ExistingCourse[];
    table: ExistingCourse[][];

    SelectedGroup: Group;

    ChangeDate: Date;
    isbtn1clicked: boolean;
    isbtn2clicked: boolean;
    isbtn3clicked: boolean;
    ExampleCourse: ExistingCourse;
    //CurrentExistingCourse: ExistingCourse;

    constructor(private weeklyScheduleService: WeeklyScheduleService, private updateScheduleBoard: UpdateScheduleBoard) {
        this.weeklyScheduleService.GetAllExistingCoursesFromServer().subscribe(data => { this.ExistingCourses = data }, error => { alert("error!"); });
        this.weeklyScheduleService.GetAllGroupsFromServer().subscribe(data => {
            this.GroupList = data;
            this.SelectedGroup = this.GroupList[0];
            this.ChangeTable();
        }, error => { });
        this.dayInWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
        this.date = new Date();
        this.ChangeDate = this.date;
        this.DateTimeCurrently = new Date();
        this.isbtn1clicked = false;
        this.isbtn2clicked = false;
        this.isbtn3clicked = false;
        this.table = new Array< ExistingCourse[]>();
        
        this.ExampleCourse = new ExistingCourse(1, this.DateTimeCurrently, new Course(2, 'aaa', 'java'), new Group(1, 'year2'));
        //this.ChangeTable();
    }

    @ViewChildren(SingleCourseinBoardComponent)
    private listsForEdit: QueryList<SingleCourseinBoardComponent>;

    @ViewChild(DateRangeSelector)
    private dateTimeCurrentlyFromComponent: DateRangeSelector;

    ngAfterViewInit() {
        setTimeout(this.date = this.dateTimeCurrentlyFromComponent.currentDate, 0);
        this.DateTimeCurrently = this.dateTimeCurrentlyFromComponent.leftDay;
    }

    getday(i: number): number {
        this.d.setTime(this.dateTimeCurrentlyFromComponent.leftDay.getTime() + (i * (1000 * 60 * 60 * 24)));
        return this.d.getDate();
    }
    
    GeneralEditing(): any {
        this.listsForEdit.forEach(x => x.EditCourse());
    }

    SelectGroup() {
        alert(this.SelectedGroup.Name);
        this.ChangeTable();
    }

    updateWeeklyData() {
        this.ChangeTable();
    }

    ClickEvent(btnId: string): any {
        if (btnId == "btnEdit") {
            this.isbtn1clicked = !this.isbtn1clicked;
            this.isbtn2clicked = false;
            this.isbtn3clicked = false;
            this.GeneralEditing();
        }
        if (btnId == "btnSave") {
            this.isbtn2clicked = !this.isbtn2clicked;
            this.isbtn1clicked = false;
            this.isbtn3clicked = false;
        }
        if (btnId == "btnPrint") {
            this.isbtn3clicked = !this.isbtn3clicked;
            this.isbtn1clicked = false;
            this.isbtn2clicked = false;
        }
    }

    ChangeTable(): any {
        //var num1: number = 0;
        //var i: number;
        //var j: number;

        //for (i = num1; i <= 6; i++) {
        //    this.table[i] = [];
        //    for (j = num1; j <= 16; j++) {
        //        this.table[i][j] = this.ExampleCourse;
        //        if (this.SelectedGroup != undefined)
        //            this.table[i][j].Course.Name = this.SelectedGroup.Name;
        //    }
        //}
        this.weeklyScheduleService.GetAllExistingCoursesForWeekFromServer(this.dateTimeCurrentlyFromComponent.leftDay, this.SelectedGroup).subscribe(courses => {
            this.table = courses;
            alert("OK!!!")
        });
    }

    //ChangeTable(selectedGroup: Group): any {
    //    //this.SelectedGroup = selectedGroup;
    //    //שינוי-עדכון הטבלה בעת בחירת קבוצה
    //    //html-איך אני עוברת על הטבלה - איך תופסים אלמנט מה
    //}

    // //להוסיף
    // //, day: number
    // //לבדוק מה הבעיה עם התאריך
    // getExistingCourseName(lesson: number): string {
    //     //לעשות בדיקת תקינות שישנו כזה קורס
    //     this.CurrentExistingCourse = this.ExistingCourses.find(c => c.GroupId == this.ChangeGroup.Id /*&& c.Date.getDay() == day*/ && c.OrderNumber == lesson);
    //     if (this.CurrentExistingCourse != undefined)
    //         return this.CurrentExistingCourse.Course.Name;
    //     return "Undefined";
    // }
}