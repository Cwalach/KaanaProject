"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var volunteer_1 = require("../models/volunteer");
var volunteer_service_1 = require("../Services/volunteer-service");
var AppComponent = (function () {
    function AppComponent(volonteerService) {
        var _this = this;
        this.volonteerService = volonteerService;
        this.title = "our final project";
        this.volonteerService.GetVolunteerFromServer().subscribe(function (data) { _this.volunteerList = data; }, function (error) { });
    }
    //ListByDays:
    AppComponent.prototype.removeVolunteer = function (volunteer) {
        var index = this.volunteerList.indexOf(volunteer); //מציאת האינדקס של האיבר אותו רוצים למחוק
        this.volunteerList.splice(index, 1); //מחיקת המשימה מן הרשימה 
    };
    AppComponent.prototype.EditVolunteer = function (volunteer) {
        this.currentVolunteer = volunteer;
    };
    AppComponent.prototype.saveAllVolunteersToServer = function () {
        this.volonteerService.saveAllVolunteersToServer(this.volunteerList).subscribe(function (data) { alert("Saved succsessed!!!"); });
    };
    AppComponent.prototype.addNewVolunteer = function () {
        this.currentVolunteer = new volunteer_1.Volunteer();
        //this.currentVolunteer.id = this.volunteerList.length + 1;
        //this.volunteerList.push(this.currentVolunteer);
    };
    AppComponent.prototype.saveNewVolunteer = function (volunteer) {
        this.currentVolunteer.id = this.volunteerList.length + 1;
        for (var i = 0; i < 7; i++) {
            this.currentVolunteer.days[i] = volunteer.days[i];
        }
        this.volunteerList.push(volunteer);
        this.currentVolunteer = null;
    };
    AppComponent.prototype.CloseDetails = function () {
        this.currentVolunteer = null;
    };
    AppComponent.prototype.ShowVolunteers = function () {
        //this.volunteerList = this.volonteerService.GetVolunteerByDay(2);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        //template: "<h1>Hello To :{{title}}</h1>",
        templateUrl: "./src/app/components/app.component.html",
        selector: "Shira-app"
    }),
    __metadata("design:paramtypes", [volunteer_service_1.VolunteerService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map