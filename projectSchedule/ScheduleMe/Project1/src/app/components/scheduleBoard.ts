import { Component,QueryList, Output, Input, EventEmitter, AfterViewInit, ViewChild, ViewChildren } from "@angular/core"
import { WeeklyScheduleService } from "../Services/WeeklyScheduleService"
import { HebrewDate } from "../Services/HebrewDate"
import { CourseInSchedule } from "../components/courseInSchedule"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { DateRangeSelector } from "../components/dateRangeSelector.component"
import { UpdateScheduleBoard } from "../Services/UpdateScheduleBoard"
import { SingleCourseinBoardComponent } from "../components/SingleCourseinBoard.component"
import { SaveChangesBoardService } from "../Services/SaveChangesBoardService"
import { ParseDate } from '../Services/parseDateService';
import { SaveCoursesBoard } from "../components/SaveCoursesBoard.component"
import { DialogOptions, DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { ModalData } from './modal/models/modal-data'
import { ModalService } from './modal/services/modal'
import { MoveDateService } from   "../Services/MoveDateService"
//declare function getHebrowNameByGreb(Date): any;

export interface ConfirmModel {
    title: string;
    message: string;
}
@Component({
    styleUrls: ['../../../Content/bootstrap/css/ScheduleBoard.css' ],
    
    templateUrl: "./src/app/components/scheduleBoard.html",
    selector: "scheduleBoard"
})


export class ScheduleBoard extends DialogComponent<ConfirmModel, boolean>
implements ConfirmModel {
    date: Date;
    DateTimeCurrently: Date;
    d: Date = new Date();
    dayInWeek: string[];
    GroupList: Group[];
    ExistingCourses: ExistingCourse[];
    table: ExistingCourse[][];

    SelectedGroup: Group;
    tableUpdated: boolean;
    ChangeDate: Date;
    isbtn1clicked: boolean;
    isbtn2clicked: boolean;
    isbtn3clicked: boolean;
    ExampleCourse: ExistingCourse;
    CourseList: Course[];
    ChangeGroup: Group;
    title: string;
    message:string;
    //CurrentExistingCourse: ExistingCourse;

    constructor(private weeklyScheduleService: WeeklyScheduleService, private updateScheduleBoard: UpdateScheduleBoard, private scheduleService: SaveChangesBoardService, private parseDate: ParseDate, dialogService: DialogService,
        private modalService: ModalService) {
        super(dialogService);
        //this.weeklyScheduleService.GetAllExistingCoursesFromServer().subscribe(data => { this.ExistingCourses = data }, error => { alert("error!"); });
        //this.scheduleService.getAllCoursesFromService().subscribe(data => { this.CourseList = data });
        //this.weeklyScheduleService.GetAllGroupsFromServer().subscribe(data => {
        //    //this.table = new Array<ExistingCourse[]>();
        //    this.GroupList = data;
        //    this.SelectedGroup = this.GroupList[0];
        //    this.tableUpdated = false;
        //    this.ChangeTable();
        //}, error => { });
        this.dayInWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
        this.date = new Date();
        this.ChangeDate = this.date;
        this.DateTimeCurrently = new Date();
        this.isbtn1clicked = false;
        this.isbtn2clicked = false;
        this.isbtn3clicked = false;
        
        this.ExampleCourse = new ExistingCourse(1, this.DateTimeCurrently, new Course(2, 'aaa', 'java'), new Group(1, 'year2'));
        //this.ChangeTable();
        this.ChangeGroup;
    }
    HebrewDate: string;
    //CurrentExistingCourse: ExistingCourse;

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

    updateWeeklyData() {
        this.tableUpdated = false;
        this.ChangeTable();
    }
    ngOnInit() {
        this.scheduleService.getAllCoursesFromService().subscribe(data => { this.CourseList = data });
        this.weeklyScheduleService.GetAllGroupsFromServer().subscribe(data => {
            //this.table = new Array<ExistingCourse[]>();
            this.GroupList = data;
            this.SelectedGroup = this.GroupList[0];
            this.tableUpdated = false;
            this.ChangeTable();
        }, error => { });
        this.updateScheduleBoard.getNewDate().subscribe(date => { this.ChangeDate = date; });
        this.updateScheduleBoard.getSelectedGroup().subscribe(group => { this.ChangeGroup = group; });
    }

    SelectGroup(group) {
        this.SelectedGroup = this.GroupList.find(g => g.Id == group);
        this.updateScheduleBoard.ChangeGroup(group);
        this.tableUpdated = false;
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
            this.saveDate();
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
            this.tableUpdated = true;
        });
    }

    saveDate()
    {
        const modalData = new ModalData();
        modalData.component = SaveCoursesBoard;
        modalData.modalHeight = 1000;
        modalData.modalWidth = 345;
        modalData.options = this.dateTimeCurrentlyFromComponent.rightDay;
        this.modalService.openModal(modalData);
    }
}