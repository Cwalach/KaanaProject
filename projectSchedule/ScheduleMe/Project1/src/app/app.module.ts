import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./components/app.component"
import { DateRangeSelectorComponent } from "./components/dateRangeSelector.component"
import {scheduleBoard}from"./components/scheduleBoard"
import { CourseInSchedule } from "./components/courseInSchedule"
import {vacation } from "./components/vacation.component"
import { ReportComponent} from "./components/Report.component"
import { BrowserModule } from "@angular/platform-browser"

import {ScheduleService  } from "./Services/ScheduleService"
import { HttpModule} from "@angular/http"
@NgModule({
    declarations: [AppComponent, DateRangeSelectorComponent, scheduleBoard, CourseInSchedule, vacation, ReportComponent],
    imports: [BrowserModule, HttpModule, FormsModule],
    bootstrap: [AppComponent],
    providers: [ScheduleService]
})

export class AppModule {


}