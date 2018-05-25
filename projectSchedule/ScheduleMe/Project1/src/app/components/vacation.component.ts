import { Component,Input } from "@angular/core"
@Component({
    templateUrl: "./src/app/components/vacation.component.html",
    selector: "vacation"

})
export class vacation {
   
   
    @Input()
    status: boolean;
   

    constructor()
    {
       
    }
    Update()
    {
        this.status = !this.status;
    }

}