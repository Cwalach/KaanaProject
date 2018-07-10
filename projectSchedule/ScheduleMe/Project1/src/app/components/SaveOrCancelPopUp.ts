import { Component, Output, Input, Injectable, EventEmitter } from "@angular/core"
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Http } from "@angular/http"
import { Router } from "@angular/router"
import { nonActiveDayService } from "../Services/nonActiveDayService"
import { nonActiveDayStateManager } from "../Services/nonActiveDayStateManager"
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


    constructor(dialogService: DialogService, private router: Router,
        private nonActiveDayService: nonActiveDayService,
        private nonActiveDayStateManager: nonActiveDayStateManager) {
        super(dialogService);
    }

    @Output()
    onClose: EventEmitter<any> = new EventEmitter<any>();

    cancelChanges() {
        this.onClose.emit();
        this.nonActiveDayStateManager.ClearNoActiveDay();
    }

    saveChanges() {
        if (!this.nonActiveDayStateManager.IsStillChanges()) {
            //DB שמירת הרשימות ב  
            this.nonActiveDayService.saveActiveDaysListToService(this.nonActiveDayStateManager.GetChangeInActiveDaysList()).
                subscribe(data => { }, error => { console.log("error"); });
            this.nonActiveDayService.saveNonActiveDaysListToService(this.nonActiveDayStateManager.GetChangeInListAddNoActiveDay()).
                subscribe(data => { }, error => { console.log("error"); });
            //ריקון הרשימות
            this.nonActiveDayStateManager.ClearNoActiveDay();
            this.onClose.emit();
        }
    }
}