﻿import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
@Injectable()
export class ScheduleService {
    constructor(private http: Http) {
    }
}