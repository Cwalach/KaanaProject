import { Component, Output, EventEmitter, ViewChild} from "@angular/core"
import { ExistingCourse } from "../models/ExistingCourses"
import { ScheduleBoardStateManager } from "../Services/ScheduleBoardStateManager"
import { SaveChangesBoardService } from "../Services/SaveChangesBoardService"
import { ExistingCoursesService } from "../Services/ExistingCoursesService"
import { MoveDateService } from "../Services/MoveDateService"
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
    selector: "SaveCoursesBoard",
    styleUrls: ['../../../Content/bootstrap/css/SaveCoursesBoard.css'],
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
    }

    public date;
    dateToPost: Date;
    thisWeekOnly: any;
    subscription: Subscription;

    btnSave: boolean = false;
    btnSaveChange: boolean = false;
    btnEndSave: boolean = false;
    isChecked: boolean=false;
    listExistingCourse: ExistingCourse[];
    comments: string;
    valid: boolean = true;

    title: string;
    message: string;
    @Output()
    onClose: EventEmitter<any> = new EventEmitter<any>();
    SaveChanges() {
        this.btnSave = false;
        this.btnSaveChange = true;
        
    }
    CancelProcess() {
        this.CloseModal();
        this.btnSaveChange = false;
    }
    EndSave() {
        this.CloseModal();
        this.listExistingCourse = this.scheduleService.GetAllExistingCourseThatWasChanged();
        this.existingCoursesService.save(this.listExistingCourse, this.dateToPost, this.comments).subscribe(data => {
            this.OpenModalSaveSucceed();
        });
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
   
    ThisWeekOnly() {
        this.isChecked = false;
        this.dateToPost = this.thisWeekOnly;// new Date("12-12-18");
    }

    public initModalProperties = (data) => {
        if (data) {
            this.thisWeekOnly = data;
        }
    }
    CloseModal() {
        this.onClose.emit();
    }
    OpenModalSaveSucceed()
    {
        const modalData = new ModalData();
        modalData.component = SaveSucceed;
        modalData.modalHeight = 600;
        modalData.modalWidth = 345;
        this.modalService.openModal(modalData);
        this.btnSaveChange = false;
        this.btnEndSave = true;
    }
}
