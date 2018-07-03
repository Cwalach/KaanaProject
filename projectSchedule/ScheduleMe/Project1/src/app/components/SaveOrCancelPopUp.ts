import { Component, Output, Input, Injectable, EventEmitter } from "@angular/core"
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Http } from "@angular/http"
export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    templateUrl: "./src/app/components/SaveOrCancelPopUp.html",
    selector: "SaveOrCancelPopUp"
})
export class SaveOrCancelPopUp
    extends DialogComponent<ConfirmModel, boolean>
    implements ConfirmModel {

    title: string;
    message: string;
    

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    //public initModalProperties = (data) => {
    //    if (data) {
    //        this.course = data;
    //        this.backup = this.course;
    //    }
    //}

    //saveToServer(item: Course) {
    //    if (item.Name != null || item.Instructor != null) {
    //        this.courseService.saveCourseToServer(item).
    //            subscribe(data => { alert("נשמר") }, error => { alert("לא נשמר:(") });
    //    }
    //    else {
    //        this.title = "אין אפשרות לשמור";
    //    }
    //}
    @Output()
    onClose: EventEmitter<any> = new EventEmitter<any>();

    cancelChanges() {
        this.onClose.emit();
    }
}