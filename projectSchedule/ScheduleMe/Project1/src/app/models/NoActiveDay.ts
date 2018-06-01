
export class NoActiveDay {

    public Id: number;
    public Date: Date;
    public OrderNumber: number;
    public Reason: string;
    
    constructor( date, nameOrderNumber, reason) {           
        this.Date = date;
        this.OrderNumber = nameOrderNumber;
        this.Reason = reason;

    }
}