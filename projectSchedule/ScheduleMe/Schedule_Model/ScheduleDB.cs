namespace Schedule_Model
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ScheduleDB : DbContext
    {
        public ScheduleDB()
            : base("name=ScheduleModel")
        {
        }

        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<ExistingCourses> ExistingCourses { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<NonActiveDays> NonactiveDays { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .Property(e => e.Id)
                .HasPrecision(18, 0);

            //modelBuilder.Entity<Course>()
            //    .HasMany(e => e.ExistingCourses)
            //    .WithOptional(e => e.Course)
            //    .WillCascadeOnDelete();

            modelBuilder.Entity<ExistingCourses>()
                .Property(e => e.Id)
                .HasPrecision(18, 0);

            modelBuilder.Entity<ExistingCourses>()
                .Property(e => e.OrderNumber)
                .HasPrecision(18, 0);

            modelBuilder.Entity<ExistingCourses>()
                .Property(e => e.CourseId)
                .HasPrecision(18, 0);

            modelBuilder.Entity<ExistingCourses>()
                .Property(e => e.GroupId)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Group>()
                .Property(e => e.Id)
                .HasPrecision(18, 0);

            //modelBuilder.Entity<Group>()
            //   .HasMany(e => e.ExistingCourses)
            //   .WithOptional(e => e.Group)
            //   .WillCascadeOnDelete();

        }



    }
}
