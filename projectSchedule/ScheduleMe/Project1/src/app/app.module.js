"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./components/app.component");
var dateRangeSelector_component_1 = require("./components/dateRangeSelector.component");
var scheduleBoard_1 = require("./components/scheduleBoard");
var courseInSchedule_1 = require("./components/courseInSchedule");
var platform_browser_1 = require("@angular/platform-browser");
var ScheduleService_1 = require("./Services/ScheduleService");
var http_1 = require("@angular/http");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent, dateRangeSelector_component_1.DateRangeSelectorComponent, scheduleBoard_1.scheduleBoard, courseInSchedule_1.CourseInSchedule],
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule],
        bootstrap: [scheduleBoard_1.scheduleBoard],
        providers: [ScheduleService_1.ScheduleService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map