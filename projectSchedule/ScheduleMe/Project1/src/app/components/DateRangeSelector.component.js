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
var DateRangeSelectorComponent = (function () {
    function DateRangeSelectorComponent() {
        this.date = new Date();
        this.sunday = this.GetDateOfSunday();
        this.saturday = this.GetDateOfSaturday();
        this.currentMonth = this.date.getMonth();
    }
    DateRangeSelectorComponent.prototype.GetDateOfSunday = function () {
        this.d = this.date;
        this.days = this.d.getDay() - 1;
        this.d = new Date(this.d.setDate(this.d.getDate() - this.days));
        return this.d.getDay();
    };
    DateRangeSelectorComponent.prototype.GetDateOfSaturday = function () {
        this.d = this.date;
        this.days = 7 - this.d.getDay();
        this.d = new Date(this.d.setDate(this.d.getDate() + this.days));
        return this.d.getDay();
    };
    return DateRangeSelectorComponent;
}());
DateRangeSelectorComponent = __decorate([
    core_1.Component({
        templateUrl: "./src/app/components/DateRangeSelector.component.html",
        selector: "DateRangeSelector"
    }),
    __metadata("design:paramtypes", [])
], DateRangeSelectorComponent);
exports.DateRangeSelectorComponent = DateRangeSelectorComponent;
//# sourceMappingURL=dateRangeSelector.component.js.map