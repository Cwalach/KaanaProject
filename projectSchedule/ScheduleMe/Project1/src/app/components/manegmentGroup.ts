import { Component, NgModule } from "@angular/core"
import { Group } from "../models/group"
import { ManegmentGroupsService } from "../Services/manegmentGroups-service"
import { GroupDetails } from "../components/group-details"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { DialogOptions, DialogService } from "ng2-bootstrap-modal";
import { ModalData } from './modal/models/modal-data'
import { ModalService } from './modal/services/modal'
@Component({
    templateUrl: "./src/app/components/manegmentGroup.html",
    selector: "ManegmentGroup"
})
export class ManegmentGroup {
    groupsList: Group[];
    currentGroup: Group;
    btnCourse: boolean = false;
    btnGroup: boolean = false;
    btnDays: boolean = false;

    constructor(private groupService: ManegmentGroupsService,
        private modalService: ModalService) {
        this.GetGroups();
        this.btnGroup = true;
    }
    GetGroups() {
        this.groupService.GetGroupFromServer().
            subscribe(data => { this.groupsList = data; }, error => { console.log("error"); });
    }
    newGroup() {
        const modalData = new ModalData();
        modalData.component = GroupDetails;
        modalData.modalHeight = 500;
        modalData.modalWidth = 500;
        this.modalService.openModal(modalData);
    }
    EditGroup(item: Group) {
        this.currentGroup = item;
        const modalData = new ModalData();
        modalData.component = GroupDetails;
        modalData.modalHeight = 500;
        modalData.modalWidth = 500;
        modalData.options = this.currentGroup;
        this.modalService.openModal(modalData);
    }
    removeGroup(item: Group) {
        var index = this.groupsList.indexOf(item);
        this.groupsList.splice(index, 1);
        //שמירה בשרת
        this.groupService.removeGroupFromServer(item).
            subscribe(data => { }, error => { console.log("error");});
    }
    saveToServer(item: Group) {
        this.groupService.saveGroupToServer(item).subscribe(data => { }, error => { console.log("error"); });
    }
    clickEvent(id: string) {
        if (id == 'btnCourse') {
            this.btnCourse = true;
            this.btnGroup = false;
            this.btnDays = false;
        }
        else {
            if (id == 'btnGroup') {
                this.btnCourse = false;
                this.btnGroup = true;
                this.btnDays = false;
            }
            else {
                if (id == 'btnDays') {
                    this.btnCourse = false;
                    this.btnGroup = false;
                    this.btnDays = true;
                }
            }
        }
    }
}