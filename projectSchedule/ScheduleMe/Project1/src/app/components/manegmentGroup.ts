import { Component,NgModule } from "@angular/core"
import { Group } from "../models/group"
import { ManegmentGroupsService } from "../Services/manegmentGroups-service"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
@Component({
    templateUrl: "./src/app/components/manegmentGroup.html",
    selector: "ManegmentGroup"
})
export class ManegmentGroup {
    groupsList: Group[];
    currentGroup: Group;
    constructor(private groupService: ManegmentGroupsService) {
    }
    GetGroups() {
        this.groupService.GetGroupFromServer().
            subscribe(data => { this.groupsList = data; }, error => { alert("Error!") });
    }
    EditGroup(item: Group) {
        this.currentGroup = item;
    }
    removeGroup(item: Group) {
        var index = this.groupsList.indexOf(item);
        this.groupsList.splice(index, 1);
        //שמירה בשרת
        this.groupService.removeGroupFromServer(item).
            subscribe(data => { alert("נמחק") }, error => { alert("לא נשמר")});
    }
    saveToServer(item: Group) {
        this.groupService.saveGroupToServer(item).subscribe(data => { alert("נשמר") }, error => { alert("לא נשמר")});
    }
}