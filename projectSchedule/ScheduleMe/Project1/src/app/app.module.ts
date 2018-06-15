import { NgModule,Input } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./components/app.component"
import { DateRangeSelectorComponent } from "./components/dateRangeSelector.component"
import {scheduleBoard}from"./components/scheduleBoard"
import { CourseInSchedule } from "./components/courseInSchedule"
import {vacation } from "./components/vacation.component"
import { ReportComponent} from "./components/Report.component"
import { SaveCoursesBoard } from "./components/SaveCoursesBoard.component"
import { VolunteerDetails } from "./components/volunteer-details.component"
import { Try } from "./components/try.component"
import { Courses } from "./components/Courses.component"
import { GroupsSystem } from "./components/GroupsSystem.component"
import { Management } from "./components/Management.component"
import { SingleCourseinBoardComponent } from "./components/SingleCourseinBoard.component"
import { BrowserModule } from "@angular/platform-browser"
import { HttpModule } from "@angular/http"
import { RouterModule, Routes } from '@angular/router'
import { ReportDetails } from "./components/ReportDetails"
import { AllDays } from "./components/AllDays.component"
import { DayInSchedule } from "./components/DayInSchedule.component"
import { ReportDetailsService } from "./Services/ReportDetailsService"
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
import { SaveChangesBoardService } from "./Services/SaveChangesBoardService"
import { PrintHtmlService } from "./Services/PrintHtmlService"


const route: Routes =
    [
        {
            path: 'GroupSystem', component: GroupsSystem
        },

        {
            path: 'manage', component: Management, children:
            [
                { path: 'courses', component: Courses },
                { path: 'NonActiveDays', component: AllDays},
                { path: 'manegmentCourse', component: ManegmentCourse },
                { path: 'manegmentGroup', component: ManegmentGroup }
                
            ],
        },
        {
            path: 'ReportDetails', component: ReportDetails
        },
        { path: "SaveCoursesBoard", component: SaveCoursesBoard}
    ]
@NgModule({

    declarations: [SingleCourseinBoardComponent, scheduleBoard,AppComponent, DateRangeSelectorComponent, CourseInSchedule, vacation, VolunteerDetails, Try,
         GroupsSystem, Management, Courses,ReportComponent,ReportDetails,AllDays,DayInSchedule, SaveCoursesBoard,ReportComponent,CourseDetails,
          ManegmentCourse, ManegmentGroup, GroupDetails, NoActiveSchedule],
    imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(route)],

    bootstrap: [Try],
    providers: [ScheduleBoardStateManager, ReportDetailsService, ExistingCoursesService, WeeklyScheduleService, ManegmentCoursesService, ManegmentGroupsService,SaveChangesBoardService, 
        nonActiveDayService, nonActiveDayStateManager, PrintHtmlService]

})

export class AppModule {
    
}