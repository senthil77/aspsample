using Freigt_Easy.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
namespace Freigt_Easy.Core
{
    public class RiaDBContext : DbContext
    {
        public RiaDBContext()
        { }

        public RiaDBContext(DbContextOptions<RiaDBContext> options) : base(options)
        {

        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //13.90.197.172
           // string conString = @"Host=13.90.197.172;Port=5432; Username=postgres; Password=postgres; Database=ria-ship; ";
                   string conString = @"Host=localhost;Port=5432; Username=postgres; Password=admin; Database= ria-ship; ";
            // string conString = @"Host=localhost;Port=5432;Username=postgres;Password=admin;Database=ria-ship;";

            optionsBuilder.UseNpgsql(conString);
            base.OnConfiguring(optionsBuilder);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<VesselSchedule> VesselSchedules { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<ScheduleDetail> ScheduleDetails { get; set; }

        public DbSet<Partner> Partners { get; set; }
        public DbSet<VesselCharge> VesselCharges { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<ChargeDetail> ChargeDetails { get; set; } // just header of the charges iclude payable nand receivable


        public DbSet<ChargedAt> ChargedAt { get; set; }


        public DbSet<QuoteTripCharge> QuoteTripCharges { get; set; }
        public DbSet<QuoteTripChargeDetail> QuoteTripChargeDetails { get; set; }
        public DbSet<Order> Orders { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(x => x.Id);
            modelBuilder.Entity<UserRole>().HasKey(x => x.Id);


            modelBuilder.Entity<Port>().HasKey(x => x.Id);
            modelBuilder.Entity<VesselSchedule>().HasKey(x => x.Id);
            modelBuilder.Entity<Currency>().HasKey(x => x.Id);
            modelBuilder.Entity<ScheduleDetail>().HasKey(x => x.Id);

            modelBuilder.Entity<Partner>().HasKey(x => x.Id);
            modelBuilder.Entity<VesselCharge>().HasKey(x => x.Id);
            modelBuilder.Entity<Package>().HasKey(x => x.Id);
            modelBuilder.Entity<ChargeDetail>().HasKey(x => x.Id);

 
            modelBuilder.Entity<ChargedAt>().HasKey(x => x.Id);
            modelBuilder.Entity<QuoteTripCharge>().HasKey(x => x.Id);
            modelBuilder.Entity<QuoteTripChargeDetail>().HasKey(x => x.Id);

            modelBuilder.Entity<Order>().HasKey(x => x.Id);
            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
         
            AddTimestamps();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void AddTimestamps()
        {

           
            var entities = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));



            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    ((BaseEntity)entity.Entity).CreatedAt = DateTime.Now;
                   
                }

                ((BaseEntity)entity.Entity).UpdatedAt = DateTime.Now;
             
            }
        }

    }
}
