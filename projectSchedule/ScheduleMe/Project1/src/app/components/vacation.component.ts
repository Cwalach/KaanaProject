import { Component,Input } from "@angular/core"
@Component({
    templateUrl: "./src/app/components/vacation.component.html",
    selector: "vacation"

})
export class vacation {
   
    status: boolean;
    @Input()
    set st(st: boolean) {
        this.status = (st );
    }

    get st(): boolean { return this.status; }


    constructor()
    {
       // this.status = st;
    }
    Update()
    {
        this.status = !this.status;
    }

}