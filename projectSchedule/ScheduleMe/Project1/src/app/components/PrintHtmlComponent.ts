import { Component,Input } from "@angular/core"
import { PrintHtmlService } from "../Services/PrintHtmlService"

@Component({
    styleUrls: ['../../../Content/bootstrap/css/ScheduleBoard.css'],
    templateUrl: "./src/app/components/PrintHtmlComponent.html",
    selector: "print_html"

})
export class PrintHtml {
   
    constructor(private printHtmlService: PrintHtmlService) {

    }
    @Input()
    TextToPrint: string;
               
    Print_Html(): void {
        this.printHtmlService.printHtml(this.TextToPrint);
    }

}