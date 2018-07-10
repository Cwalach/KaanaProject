import { Injectable } from "@angular/core";
//import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MoveDateService {
    private updateCurrentDateHandler = new Subject<any>();
   
    public getUpdateNewUserHandler(): Observable<any> {
        return this.updateCurrentDateHandler.asObservable();
    }

    public setUpdateNewUserHandler(newDate: Date) {
        this.updateCurrentDateHandler.next(newDate);
    }
    //---------first----------
    //public getUpdateNewUserHandler(): Observable<any> {
    //    return this.updateCurrentDateHandler.asObservable();
    //}

    //public setUpdateNewUserHandler(newDate: Date): void {
    //    this.updateCurrentDateHandler.next(newDate);
    //}

}
