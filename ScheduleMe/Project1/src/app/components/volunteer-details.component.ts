import { Component, Input ,Output, EventEmitter} from "@angular/core"
import { Volunteer } from "../models/volunteer"
import { User, USERS } from "../models/user"

@Component({
    templateUrl: "./src/app/components/volunteer-details.component.html",
    selector:"volunteer-details"
})

export class VolunteerDetails {
    @Input()
    volunteer: Volunteer;

    @Output()
    onSaveNewVolunteer: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();

    //allUsers: User[] = USERS;

    submitted: boolean = false;
    @Output()
    onSavaChange: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();
    saveNewVolunteer()
    {
        this.onSaveNewVolunteer.emit(this.volunteer);
        this.submitted = true;         
        this.volunteer = null;
    }
    CloseDet() {
        this.onSavaChange.emit();
    }
   
}