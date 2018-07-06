import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { Try } from "./try.component";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./src/app/components/MainPage.component.html",
    selector: "MainPage"
})
export class MainPageComponent {
    constructor(private router: Router) { }

    buttonWasClicked: boolean = false;
    @ViewChild(Try)
    private Trycomponent: Try;

    onButtonClick(id) {
        this.buttonWasClicked = true;
        this.router.navigate(['/Try'], { queryParams: { btnId: id } });
    }
} 