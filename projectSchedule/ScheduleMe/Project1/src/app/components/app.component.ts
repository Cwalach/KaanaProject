import { Component } from "@angular/core"

import { ScheduleService } from "../Services/ScheduleService"

@Component({
    //template: "<h1>Hello To :{{title}}</h1>",
    templateUrl: "./src/app/components/app.component.html",
    selector: "Shira-app"

})
export class AppComponent {

    constructor(private volonteerService: ScheduleService) {

    }
}