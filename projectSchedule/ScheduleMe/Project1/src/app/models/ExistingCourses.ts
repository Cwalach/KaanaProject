import { Course } from "../models/Course"
import { Group } from "../models/Group" 

export class ExistingCourse {  
    public Id: number;
    public Date: Date;
    public OrderNumber: number;
    public CourseId: number;
    public GroupId: number;
    public Course: Course;
    public Group: Group;
    public Comments: string;
    constructor(orderNumber, date, course, group) {
        this.OrderNumber = orderNumber;
        this.Date = date;
        this.Course = course;
        this.Group = group;
    }
    //public existingCourse: Array<ExistingCourse> = [
    //    { Id: 1, GroupId: 1 }]
   
}