import { NgModule, Input } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./components/app.component"
import { ScheduleBoard }from"./components/scheduleBoard"
import { DateRangeSelector } from "./components/dateRangeSelector.component"
import { CourseInSchedule } from "./components/courseInSchedule"
import { vacation } from "./components/vacation.component"
import { ReportComponent } from "./components/Report.component"
import { SaveCoursesBoard } from "./components/SaveCoursesBoard.component"
import { VolunteerDetails } from "./components/volunteer-details.component"
import { Try } from "./components/try.component"
import { Courses } from "./components/Courses.component"
import { GroupsSystem } from "./components/GroupsSystem.component"
import { Management } from "./components/Management.component"
import { BrowserModule } from "@angular/platform-browser"
import { HttpModule } from "@angular/http"
import { RouterModule, Routes } from '@angular/router'
import { ReportDetailsComponent } from "./components/ReportDetails.component"
import { AllDays } from "./components/AllDays.component"
import { DayInSchedule } from "./components/DayInSchedule.component"
import { ReportDetailsService } from "./Services/ReportDetailsService"
import { SingleCourseinBoardComponent } from "./components/SingleCourseinBoard.component"
import { WeeklyScheduleService } from "./Services/WeeklyScheduleService"
import { ScheduleBoardStateManager } from "./Services/ScheduleBoardStateManager"
import { ExistingCoursesService } from "./Services/ExistingCoursesService"
import { ManegmentCourse } from "./components/manegmentCourse"
import { CourseDetails } from "./components/course-details"
import { ManegmentGroup } from "./components/manegmentGroup"
import { GroupDetails } from "./components/group-details"
import { ManegmentCoursesService } from "./Services/manegmentCourses-service"
import { ManegmentGroupsService } from "./Services/manegmentGroups-service"
import { NoActiveSchedule } from "./components/NoActiveSchedule"
import { nonActiveDayStateManager } from "./Services/nonActiveDayStateManager"
import { nonActiveDayService } from "./Services/nonActiveDayService"
import { PrintHtmlService } from "./Services/PrintHtmlService"
import { PrintHtml } from "./components/PrintHtmlComponent"
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalService } from '../app/components/modal/services/modal'
import { ModalComponent } from '../app/components/modal/ModalComponent';
import { SaveChangesBoardService } from "./Services/SaveChangesBoardService"
import { SaveOrCancelPopUp } from "../app/components/SaveOrCancelPopUp"
import { UpdateScheduleBoard } from "./Services/UpdateScheduleBoard";
import { MainPageComponent } from "./components/MainPage.component"
import { ParseDate } from "./Services/parseDateService";

const route: Routes =
    [
        {
            path: 'GroupSystem', component: ScheduleBoard
        },
        {
            path: 'ReportDetails', component: ReportDetailsComponent
        },
        {
            path: 'manage', component: Management, children:
            [
                { path: 'courses', component: Courses },
                { path: 'NonActiveDays', component: AllDays },
                { path: 'manegmentCourse', component: ManegmentCourse },
                { path: 'manegmentGroup', component: ManegmentGroup }
            ]
        },
        {
            path: "SaveCoursesBoard", component: SaveCoursesBoard
        }
    ]
@NgModule({
    declarations: [
        SingleCourseinBoardComponent,
        ScheduleBoard,
        AppComponent,
        DateRangeSelector,
        CourseInSchedule,
        vacation,
        VolunteerDetails,
        Try,
        GroupsSystem,
        Management,
        Courses,
        ReportDetailsComponent,
        ReportComponent,
        AllDays,
        DayInSchedule,
        SaveCoursesBoard,
        CourseDetails,
        ManegmentCourse,
        ManegmentGroup,
        GroupDetails,
        NoActiveSchedule,
        PrintHtml,
        ModalComponent,
        SaveOrCancelPopUp,
        MainPageComponent],
    
    imports: [BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(route),
        BootstrapModalModule.forRoot({ container: document.body })],
    bootstrap: [Try],/*[MainPageComponent],*/
    providers: [ScheduleBoardStateManager,
        ExistingCoursesService,
        WeeklyScheduleService,
        ReportDetailsService,
        ManegmentCoursesService,
        ManegmentGroupsService,
        SaveChangesBoardService,
        nonActiveDayService,
        nonActiveDayStateManager,
        ModalService,
        PrintHtmlService,
        UpdateScheduleBoard,
        ParseDate
    ],
    entryComponents: [ModalComponent,
        CourseDetails,
        GroupDetails,
        SaveOrCancelPopUp]
})

export class AppModule {

}