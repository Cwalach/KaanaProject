import { Component, Input,Output,EventEmitter } from "@angular/core"
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

    backup: Group;
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
            this.backup = this.group;
        }
    }

    saveToServer(item: Group) {
        if (item.Name != null) {
            this.groupService.saveGroupToServer(item).
                subscribe(data => { }, error => { console.log('error'); });
        }
        this.onClose.emit();
    }

    @Output()
    onClose: EventEmitter<Group> = new EventEmitter<Group>();

    cancelChanges() {
        if (this.group.Id != null) {
            this.group.Name = this.backup.Name;
        }
        this.onClose.emit();
    }
}