
export class Course {
    
    public Id: number;
    public Instructor: string;
    public Name: string;
    //ExistingCourses: ICollection<ExistingCourses>
    constructor(id, instructor, name)
    {
        this.Id = id;
        this.Instructor = instructor;
        this.Name = name;
    }    
}