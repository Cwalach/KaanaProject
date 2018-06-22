import { Injectable } from "@angular/core"
import { Group } from "../models/group"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
@Injectable()
export class ManegmentGroupsService {
    constructor(private http: Http) {
    }
    GetGroupFromServer(): Observable<Group[]> {
        return this.http.get("api/Group/Get").map(
            data => {
                return data.json() as Group[]
            });
    }
    saveGroupToServer(groupToSave: Group): Observable<boolean> {
        return this.http.post("api/Group/Post", groupToSave).map(res => { return true; });
    }
    removeGroupFromServer(groupToRemove: Group): Observable<boolean> {
        return this.http.post("api/Group/RemoveGroup/" + groupToRemove, groupToRemove).map(res => { return true; });
    }
    newGroup(newGroup: Group): Observable<boolean> {
        return this.http.post("api/Group/AddGroup/" + newGroup, newGroup).map(res => { return true; });
    }
}