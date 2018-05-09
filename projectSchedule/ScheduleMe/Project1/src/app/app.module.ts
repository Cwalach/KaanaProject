import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./components/app.component"
import { DateRangeSelectorComponent } from "./components/dateRangeSelector.component"
import {scheduleBoard}from"./components/scheduleBoard"
import { CourseInSchedule } from "./components/courseInSchedule"
<<<<<<< HEAD
import {vacation } from "./components/vacation.component"

=======
import { ReportComponent} from "./components/Report.component"
>>>>>>> add report and ts models

import { BrowserModule } from "@angular/platform-browser"

import {ScheduleService  } from "./Services/ScheduleService"
import { HttpModule} from "@angular/http"
@NgModule({
<<<<<<< HEAD
    declarations: [AppComponent, DateRangeSelectorComponent, scheduleBoard, CourseInSchedule,vacation],
=======
    declarations: [AppComponent, DateRangeSelectorComponent, scheduleBoard, CourseInSchedule, ReportComponent],
>>>>>>> add report and ts models
    imports: [BrowserModule, HttpModule, FormsModule],
    bootstrap: [scheduleBoard],
    providers: [ScheduleService]
})

export class AppModule {


}