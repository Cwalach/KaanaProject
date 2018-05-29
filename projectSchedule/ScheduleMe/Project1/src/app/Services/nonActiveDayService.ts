import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { NoActiveDay } from "../models/NoActiveDay"
@Injectable()
export class nonActiveDayService {
    constructor(private http: Http) {
    }   

    getAllNoActiveDayFromService(): Observable<NoActiveDay[]> {        
        return this.http.get("api/NoActiveDay/GetNoActiveDay").map(res => { return res.json() as NoActiveDay[] });
    }

    saveNonActiveDaysListToService(noActiveDaysList: NoActiveDay[]): Observable<boolean> {
        return this.http.post("api/NoActiveDay/AddNoActiveDay", noActiveDaysList).map(res => { return true; });
    }
    saveActiveDaysListToService( activeDaysList: Array<number>): Observable<boolean> {        
        return this.http.post("api/NoActiveDay/RemoveNoActiveDay", activeDaysList).map(res => { return true; });
    }  
}