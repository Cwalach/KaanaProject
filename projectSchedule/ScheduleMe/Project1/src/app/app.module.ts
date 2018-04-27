import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./components/app.component"


import { BrowserModule } from "@angular/platform-browser"
//import { TaskDetails } from "./components/task-details.component"
import {ScheduleService  } from "./Services/ScheduleService"
import { HttpModule} from "@angular/http"
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpModule ,FormsModule],
    bootstrap: [AppComponent],
    providers: [ScheduleService]
})

export class AppModule {


}