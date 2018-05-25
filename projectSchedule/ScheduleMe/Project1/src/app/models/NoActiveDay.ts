
export class NoActiveDay {

    public Id: number;
    public Date: Date;
    public OrderNumber: number;
    public Reason: string;
    
    constructor(id, date, nameOrderNumber, reason) {
        this.Id = id;
        this.Date = date;
        this.OrderNumber = nameOrderNumber;
        this.Reason = reason;

    }
}