import { Component } from "@angular/core"
@Component({
    templateUrl: "./src/app/components/PopUp.component.html",
    selector: "PopUp"
})
export class PopUp {
    btnSave: boolean = false;
    btnSaveChange: boolean = false;
    Save() {
        this.btnSave = true;
    }
    SaveChanges() {
        this.btnSave = false;
        this.btnSaveChange = true;
    }
}
