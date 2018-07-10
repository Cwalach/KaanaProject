import { Component, Input, Output, EventEmitter } from "@angular/core"
import { nonActiveDayService } from "../Services/nonActiveDayService"
import { nonActiveDayStateManager } from "../Services/nonActiveDayStateManager"
import { ManegmentCoursesService } from "../Services/manegmentCourses-service"
import { DialogOptions, DialogService } from "ng2-bootstrap-modal";
import { ModalData } from './modal/models/modal-data'
import { ModalService } from './modal/services/modal'
import { SaveOrCancelPopUp } from "../components/SaveOrCancelPopUp"
import { Router, NavigationEnd } from "@angular/router"
@Component({
    templateUrl: "./src/app/components/try.component.html",
    selector: "try"
})
export class Try {
    statusbtn1: boolean = false
    statusbtn2: boolean = false;
    statusbtn3: boolean = false;
    flagMoving: boolean = false;
    flagForSavingChanges: boolean = false;
    constructor(private nonActiveDayService: nonActiveDayService,
        private nonActiveDayStateManager: nonActiveDayStateManager,
        private modalService: ModalService,
        private router: Router) {
        router.events.filter(event => event instanceof NavigationEnd).subscribe((val) => {
            console.log('==== change url=====');
        });
    }

    clickEvent(id: string) {
        if (!this.nonActiveDayStateManager.IsStillChanges()) {
            this.flagForSavingChanges = true;
            const modalData = new ModalData();
            modalData.component = SaveOrCancelPopUp;
            modalData.modalHeight = 500;
            modalData.modalWidth = 500;
            this.modalService.openModal(modalData);
        }

        if (id == "schduleGroups") {
            this.statusbtn1 = true;
            this.statusbtn2 = false;
            this.statusbtn3 = false;
        }
        if (id == "manegement") {
            this.statusbtn2 = true;
            this.statusbtn1 = false;
            this.statusbtn3 = false;
        }
        if (id == "report") {
            this.statusbtn3 = true;
            this.statusbtn1 = false;
            this.statusbtn2 = false;
        }
    }

    saveChangesInDB() { 
        this.nonActiveDayService.saveActiveDaysListToService(this.nonActiveDayStateManager.GetChangeInActiveDaysList()).
            subscribe(data => { }, error => { console.log("error"); });
        this.nonActiveDayService.saveNonActiveDaysListToService(this.nonActiveDayStateManager.GetChangeInListAddNoActiveDay()).
            subscribe(data => { }, error => { console.log("error"); });
        this.nonActiveDayStateManager.ClearNoActiveDay();
        this.flagMoving = true;
    }
}