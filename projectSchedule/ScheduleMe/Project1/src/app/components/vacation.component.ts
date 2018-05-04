import { Component } from "@angular/core"
@Component({
    templateUrl: "./src/app/components/vacation.component.html",
    selector: "vacation"

})
export class vacation {
    status: boolean;

    constructor()
    {
        this.status = true;
    }
    Update()
    {
        this.status = !this.status;
    }

}