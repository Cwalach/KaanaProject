
export class Volunteer {
    id: number;
    name: string;
    dayInWeek: number;
    days: boolean[] = [false, false, false,false,false,false,false];

    constructor()
    {
        this.id = 0;
    }
}