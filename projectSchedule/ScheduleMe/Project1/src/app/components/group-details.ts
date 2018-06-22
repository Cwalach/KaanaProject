import { Component, Input } from "@angular/core"
import { Group } from "../models/group"
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Http } from "@angular/http"
import { ManegmentGroupsService } from "../Services/manegmentGroups-service"
export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    templateUrl: "./src/app/components/group-details.html",
    selector: "group-details"
})

export class GroupDetails
    extends DialogComponent<ConfirmModel, boolean>
    implements ConfirmModel {
    @Input()
    group: Group;

    title: string;
    message: string;

    g: Group;
    nameGroup: string;

    constructor(dialogService: DialogService,
        private groupService: ManegmentGroupsService) {
        super(dialogService);
        if (this.group == null)
            this.group = new Group();
    }

    public initModalProperties = (data) => {
        if (data) {
            this.group = data;
        }
    }

    saveToServer(item: Group) {
        this.groupService.saveGroupToServer(item).
            subscribe(data => { alert("נשמר") }, error => { alert("לא נשמר:(") });
    }
    cancelChanges() {

    }
}