import { Injectable } from "@angular/core"
import { Group } from "../models/group"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ManegmentGroupsService {
    constructor(private http: Http) {
    }

    private group = new Subject<any>();

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

    addGroup(newGroup: Group) {
        this.group.next({ group: newGroup});
    }

    getNewGroup(): Observable<any> {
        return this.group.asObservable();
    }
}