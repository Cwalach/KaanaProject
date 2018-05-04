import { Component, Input ,Output, EventEmitter} from "@angular/core"


@Component({
    templateUrl: "./src/app/components/Management.component.html",
    selector:"Management"
})
export class Management{
    buttonClicked: boolean = false;
    HideDiv()
    {
        this.buttonClicked = true;
    }
}