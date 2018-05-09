import { Component,Input } from "@angular/core"
import { Group } from "../models/group"
@Component({
    templateUrl: "./src/app/components/group-details.html",
    selector:"group-details"
})
export class GroupDetails {
    @Input()
    group: Group;
}