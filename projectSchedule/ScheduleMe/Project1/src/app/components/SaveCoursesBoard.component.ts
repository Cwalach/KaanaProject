import { Component, Output, EventEmitter, ViewChild} from "@angular/core"
import { ExistingCourse } from "../models/ExistingCourses"
import { ScheduleBoardStateManager } from "../Services/ScheduleBoardStateManager"
import { SaveChangesBoardService } from "../Services/SaveChangesBoardService"
import { ExistingCoursesService } from "../Services/ExistingCoursesService"
import { MoveDateService } from "../Services/MoveDateService"
//import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Subscription } from 'rxjs/Subscription';
import { SaveSucceed } from "../components/SaveSucceed.component"

import { DialogOptions, DialogService, DialogComponent} from "ng2-bootstrap-modal";
import { ModalData } from './modal/models/modal-data'
import { ModalService } from './modal/services/modal'

export interface ConfirmModel {
    title: string;
    message: string;
}
@Component({
    templateUrl: "./src/app/components/SaveCoursesBoard.component.html",
    selector: "SaveCoursesBoard"
})
export class SaveCoursesBoard extends DialogComponent< ConfirmModel, boolean >
    implements ConfirmModel {
    constructor(private scheduleService:SaveChangesBoardService,private ScheduleBoardStateManager: ScheduleBoardStateManager,
        private existingCoursesService: ExistingCoursesService,
        dialogService: DialogService,
        private moveDateService: MoveDateService,
        private modalService: ModalService)
    {
        super(dialogService);
        this.moveDateService.getUpdateNewUserHandler().subscribe(data => {
            console.log('============');
            this.thisWeekOnly = data;
        });
    }

    public date;
    dateToPost: Date;
    thisWeekOnly: any;
    subscription: Subscription;

    btnSave: boolean = false;
    btnSaveChange: boolean = false;
    btnEndSave: boolean = false;
    isChecked: boolean;
    listExistingCourse: ExistingCourse[];
    comments: string;
    valid: boolean = true;

    title: string;
    message: string;
    //@Output()
    //onSavaChanges: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    onClose: EventEmitter<any> = new EventEmitter<any>();
    SaveChanges() {
        this.btnSave = false;
        this.btnSaveChange = true;
        
    }
    CancelProcess() {
        this.btnSaveChange = false;
    }
    EndSave() {
        this.onClose.emit();
        //this.listExistingCourse = this.ScheduleBoardStateManager.GetAllExistingCourseThatWasChanged();
       this.listExistingCourse = this.scheduleService.GetAllExistingCourseThatWasChanged();

        this.existingCoursesService.save(this.listExistingCourse, this.dateToPost, this.comments).subscribe(data => { alert("Saved succsessed!!!") });

        const modalData = new ModalData();
        modalData.component = SaveSucceed;
        modalData.modalHeight = 500;
        modalData.modalWidth = 345;
        this.modalService.openModal(modalData);
        this.btnSaveChange = false;
        this.btnEndSave = true;
        this.listExistingCourse = this.ScheduleBoardStateManager.GetAllExistingCourseThatWasChanged();
        this.existingCoursesService.save(this.listExistingCourse, this.dateToPost, this.comments).subscribe(data => { alert("Saved succsessed!!!") });
    }
    parseDate(dateString: string): Date {
        if (dateString) {
            this.date = new Date(dateString);
            this.dateToPost = this.date;
            return this.date;
        } else {
            return null;
        }
    }
    SetChecked() { 
        this.isChecked= true;
    }
   
    ThisWeekUntil() {
        //this.moveDateService.getUpdateNewUserHandler().subscribe((data: Date) => {
        //    console.log('-----data-----', data);
        //    this.thisWeekOnly = data
        //});
        //this.moveDateService.getUpdateNewUserHandler().subscribe(data => { this.thisWeekOnly = data; });
        //this.moveDateService.getUpdateNewUserHandler().subscribe(data => { this.thisWeekOnly = data; });
        //this.moveDateService.setUpdateNewUserHandler(new Date());
        this.dateToPost = this.thisWeekOnly;// new Date("12-12-18");
    }
}
