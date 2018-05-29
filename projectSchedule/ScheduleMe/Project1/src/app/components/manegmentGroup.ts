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
    btnCourse: boolean = false;
    btnGroup: boolean = false;
    btnDays: boolean = false;
    constructor(private groupService: ManegmentGroupsService) {
        this.GetGroups();
        this.btnGroup = true;
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