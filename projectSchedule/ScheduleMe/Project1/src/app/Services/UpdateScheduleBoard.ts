import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { Subject } from 'rxjs/Subject';
import { Group } from "../models/group";

@Injectable()
export class UpdateScheduleBoard {
    private date = new Subject<any>();
    private group = new Subject<any>();

    ChangeDate(newDate: Date) {
        this.date.next({ date: newDate });
    }

    ChangeGroup(currentGroup: Group) {
        this.group.next({  group: currentGroup });
    }

    getNewDate(): Observable<any> {
        return this.date.asObservable();
    }

    getSelectedGroup(): Observable<any> {
        return this.group.asObservable();
    }

    getWeeklyCourses(currentGroup: Group, currentDate: Date) {
        alert(currentDate);
        return null;
    }
    //clearMessage() {
    //    this.subject.next();
    //}
}