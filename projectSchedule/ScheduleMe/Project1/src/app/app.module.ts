import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./components/app.component"
import { DateRangeSelectorComponent } from "./components/dateRangeSelector.component"


import { BrowserModule } from "@angular/platform-browser"
//import { TaskDetails } from "./components/task-details.component"
import {ScheduleService  } from "./Services/ScheduleService"
import { HttpModule} from "@angular/http"
@NgModule({
    declarations: [AppComponent,DateRangeSelectorComponent],
    imports: [BrowserModule, HttpModule, FormsModule],
    bootstrap: [DateRangeSelectorComponent],
    providers: [ScheduleService]
})

export class AppModule {


}