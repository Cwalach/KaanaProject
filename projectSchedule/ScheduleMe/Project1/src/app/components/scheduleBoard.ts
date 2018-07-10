import { Component,QueryList, Output, Input, EventEmitter, AfterViewInit, ViewChild, ViewChildren } from "@angular/core"
import { WeeklyScheduleService } from "../Services/WeeklyScheduleService"
import { CourseInSchedule } from "../components/courseInSchedule"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { DateRangeSelector } from "../components/dateRangeSelector.component"
import { UpdateScheduleBoard } from "../Services/UpdateScheduleBoard"
import { SingleCourseinBoardComponent } from "../components/SingleCourseinBoard.component"
import { SaveChangesBoardService } from "../Services/SaveChangesBoardService"
import { ParseDate } from '../Services/parseDateService';

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
    CourseList: Course[];
    //CurrentExistingCourse: ExistingCourse;

    constructor(private weeklyScheduleService: WeeklyScheduleService, private updateScheduleBoard: UpdateScheduleBoard, private scheduleService: SaveChangesBoardService, private parseDate: ParseDate) {
        this.weeklyScheduleService.GetAllExistingCoursesFromServer().subscribe(data => { this.ExistingCourses = data }, error => { alert("error!"); });
        this.scheduleService.getAllCoursesFromService().subscribe(data => { this.CourseList = data });
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

    getday(i: number): string {
        this.d.setTime(this.dateTimeCurrentlyFromComponent.leftDay.getTime() + (i * (1000 * 60 * 60 * 24)));
        return this.parseDate.getHebrowNameByGreb( this.d);
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
        this.weeklyScheduleService.GetAllExistingCoursesForWeekFromServer(this.dateTimeCurrentlyFromComponent.leftDay, this.SelectedGroup).subscribe(courses => {
            this.table = courses;
        });
    }
}