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

    constructor(id, date, course, group) {
        this.Id = id;
        this.Date = date;
        this.Course = course;
        this.Group = group;
    }
    //public existingCourse: Array<ExistingCourse> = [
    //    { Id: 1, GroupId: 1 }]

}