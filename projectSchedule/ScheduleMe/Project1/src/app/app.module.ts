import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./components/app.component"
import { DateRangeSelectorComponent } from "./components/dateRangeSelector.component"
import {scheduleBoard}from"./components/scheduleBoard"
import { CourseInSchedule } from "./components/courseInSchedule"
import {vacation } from "./components/vacation.component"
import { ReportComponent} from "./components/Report.component"
import { PopUp } from "./components/PopUp.component"
import { VolunteerDetails } from "./components/volunteer-details.component"
import { Try } from "./components/try.component"
import { Courses } from "./components/Courses.component"
import { GroupsSystem } from "./components/GroupsSystem.component"
import { Management } from "./components/Management.component"
import { BrowserModule } from "@angular/platform-browser"
<<<<<<< HEAD
import { HttpModule } from "@angular/http"
import { RouterModule, Routes } from '@angular/router'
=======
import { ReportDetails } from "./components/ReportDetails"
import { AllDays } from "./components/AllDays.component"
import { DayInSchedule } from "./components/DayInSchedule.component"



>>>>>>> add vacation components
import {SaveChangesBoardService  } from "./Services/ScheduleService"
const route: Routes =
    [
        //{
        //    path: 'days', component: VolunteerDetails
        //},
        //{
        //    path: 'try', component: Try, children: [
        //        { path: 'try2', component: VolunteerDetails }
        //    ],
        //},
       
        {
            path: 'GroupSystem', component: GroupsSystem
        },
        {
            path: 'manage', component: Management, children:
            [
                { path: 'courses', component: Courses }
               
                
            ],
        }
    ]
@NgModule({
<<<<<<< HEAD

    declarations: [AppComponent, DateRangeSelectorComponent, scheduleBoard, CourseInSchedule, vacation, VolunteerDetails, Try, GroupsSystem, Management, Courses,PopUp,ReportComponent],
    imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(route)],
    bootstrap: [Try],
=======
    declarations: [AppComponent, DateRangeSelectorComponent, scheduleBoard, CourseInSchedule, vacation, ReportDetails,AllDays,DayInSchedule],
    imports: [BrowserModule, HttpModule, FormsModule],
    bootstrap: [AllDays],
>>>>>>> add vacation components
    providers: [SaveChangesBoardService]
})


export class AppModule {


}