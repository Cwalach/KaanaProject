import { Injectable } from "@angular/core"
import { Http, RequestOptions, Headers } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import { NoActiveDay } from "../models/NoActiveDay"
@Injectable()
export class nonActiveDayService {
    headers: Headers;
    options: RequestOptions;
    tions;
    constructor(private http: Http) {

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        this.options = new RequestOptions({ headers: this.headers });
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
    getNoActiveDayByWeekDateFromService(fromDate: Date): Observable<NoActiveDay[]> {
        //this.options = new RequestOptions({ headers: this.headers, params: fromDate });
        return this.http.get("api/NoActiveDay/GetByWeekDate/?fromDate=" + fromDate.toDateString()).map(res => { return res.json() as NoActiveDay[] });
    }
}