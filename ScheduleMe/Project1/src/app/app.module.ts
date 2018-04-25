import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./components/app.component"
import { VolunteerDetails } from "./components/volunteer-details.component"
import { Days } from "./components/days.component"
import { BrowserModule } from "@angular/platform-browser"
//import { TaskDetails } from "./components/task-details.component"
import { VolunteerService } from "./Services/volunteer-service"
import { HttpModule} from "@angular/http"
@NgModule({
    declarations: [AppComponent, VolunteerDetails,Days],
    imports: [BrowserModule, HttpModule ,FormsModule],
    bootstrap: [AppComponent],
    providers: [VolunteerService]
})

export class AppModule {


}