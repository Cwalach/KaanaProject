import { Injectable } from "@angular/core"
import { Volunteer } from "../models/volunteer"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
@Injectable() 
export class VolunteerService {
    constructor(private http:Http)
    {
    }
    GetVolunteerFromServer(): Observable<Volunteer[]> {
        return this.http.get("api/Volonteer/Get").map(data => { return data.json() as Volunteer[] });
    }
    saveAllVolunteersToServer(volunteersToSave: Volunteer[]): Observable<boolean> {
       
        return this.http.post("api/Volonteer/Post", volunteersToSave).map(res => { return true; });
    }
    getVolunteerByIndex(index: number): Observable<Volunteer[]> {
        return this.http.post("api/Volonteer/GetVolunteerByDay", index).map(data => { return data.json() as Volunteer[]});
    }
}