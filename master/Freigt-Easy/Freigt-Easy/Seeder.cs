using Freigt_Easy.Core;
using Freigt_Easy.Core.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy
{
    public class Seeder
    {


        public void Seed()
        {
  
            using (var db = new RiaDBContext())
            {
                #region User


                db.UserRoles.Add(new UserRole()
                {
                    Id = 0,

                    RoleName = "TEMP",


                });

                db.UserRoles.Add(new UserRole()
                {
                    Id = 0,

                    RoleName = "ADMIN",


                });

                db.UserRoles.Add(new UserRole()
                {
                    Id = 0,

                    RoleName = "SUPPORT",


                });

                db.UserRoles.Add(new UserRole()
                {
                    Id = 0,

                    RoleName = "PARTNER",


                });

                db.UserRoles.Add(new UserRole()
                {
                    Id = 0,

                    RoleName = "VENDORS",


                });

                db.Partners.Add(new Partner()
                {
                    Id = 0,
                    PartnerName = "ADMIN",
                    Address1 = "ADMIN",
                    Address2 = "ADMIN",
                    IsActive = true,
                    City = "ADMIN",
                    Contact1 = "ADMIN",
                    Email1 = "admin@gmail.com",
                    Phone1 = "9886249389",
                    ZipCode = "600008",
                    Contact2 = "ADMIN",
                    IsCreditAllowed=true,
                    Email2 = string.Empty,
                    IsSusbcribed = true,
                    ValidUpTo = DateTime.Now.AddYears(100),
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,


                });
                //;
                db.SaveChanges();


                int AdminId = db.UserRoles.First(x => x.RoleName == "ADMIN").Id;
                int partnerId = db.Partners.First(x => x.PartnerName == "ADMIN").Id;

                db.Users.Add(new User()
                {
                    Id = 0,
                    Email = "k.sendilkumar@gmail.com",
                    Password = "Brithol@4877",
                    CompanyName = "ADMIN",
                    UserRoleId = AdminId,
                    ActivationCode = string.Empty,
                    IsActive = true,
                    PartnerId = partnerId,
                    FirstName = "Senthil",
                    LastName = "Kumar",
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                    ValidUpTo= DateTime.Now.AddYears(100), 
                   

                }); ;
                #endregion

                #region chargedAT

                db.ChargedAt.Add(new ChargedAt()
                {
                    Id = 0,
                    Name = "ORIGIN",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });

                db.ChargedAt.Add(new ChargedAt()
                {
                    Id = 0,
                    Name = "DESTINATION",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });



                #endregion
                #region Currencies
                db.Currencies.Add(new Currency()
                {

                    Id = 0,
                    CurrencyCode = "USD",
                    Description = "United States of Dollar",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,

                });

                db.Currencies.Add(new Currency()
                {

                    Id = 0,
                    CurrencyCode = "INR",
                    Description = "Indian Rupees",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,

                });

                db.Currencies.Add(new Currency()
                {

                    Id = 0,
                    CurrencyCode = "MYR",
                    Description = "Malaysian Ringet",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,

                });

                db.Currencies.Add(new Currency()
                {

                    Id = 0,
                    CurrencyCode = "SGD",
                    Description = "Singpore Dollar",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,

                });

                db.Currencies.Add(new Currency()
                {

                    Id = 0,
                    CurrencyCode = "AED",
                    Description = "United Arab Emirates Dirham",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,

                });
                #endregion

                #region Packages

                db.Packages.Add(new Package()
                {

                    Id = 0,
                    PackageName = "20 FT",
                    Description = "20 Feet Container",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });

                db.Packages.Add(new Package()
                {

                    Id = 0,
                    PackageName = "40 FT",
                    Description = "40 Feet Container",
                    IsActive = true,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });
                #endregion

                #region Ports
                db.Ports.Add(new Port()
                {
                    Id = 0,
                    PortCode = "INMAA",
                    PortDescription = "CHENNAI PORT",
                    CityCode = "MAA",
                    CityDescription = "CHENNAI",
                    CountryCode = "IN",
                    CountryDescription = "INDIA",
                    IsActive = true,
                    LongDescription = "CHENNAI PORT",
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,


                });

                db.Ports.Add(new Port()
                {
                    Id = 0,
                    PortCode = "LKCMB",
                    PortDescription = "COLUMBO PORT",
                    CityCode = "CMB",
                    CityDescription = "COLUMBO",
                    CountryCode = "LK",
                    CountryDescription = "SRI LANKA",
                    IsActive = true,
                    LongDescription = "COLUMBO PORT",
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,


                });


                db.Ports.Add(new Port()
                {
                    Id = 0,
                    PortCode = "AEJBL",
                    PortDescription = "PORT OF JEBAL ALI",
                    CityCode = "DWC",
                    CityDescription = "JEBAL ALI",
                    CountryCode = "UAE",
                    CountryDescription = "UNITED ARAB EMIRATES",
                    IsActive = true,
                    LongDescription = "PORT OF JEBAL ALI",
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,


                });

                db.SaveChanges();

                #endregion


                #region charge details //origin

                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "THC Charges",
                    ChargedAtId = 1,

                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });


                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "EDI Charges",
                    ChargedAtId = 1,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });


                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "BL fee",
                    ChargedAtId = 1,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });


                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "ARC Charges",
                    ChargedAtId = 1,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });

                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "Seat Charges",
                    ChargedAtId = 1,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });
                #endregion

                #region ChargeDetails // Destination

                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "DO Charges",
                    ChargedAtId = 2,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });

                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "Weightment Charges",
                    ChargedAtId = 2,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });


                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "MUC Charges",
                    ChargedAtId = 2,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });
                db.ChargeDetails.Add(new ChargeDetail()
                {

                    Id = 0,
                    IsActive = true,
                    Name = "CTO Charges",
                    ChargedAtId = 2,
                    CreatedBy = "Senthil",
                    CreatedAt = DateTime.Now,
                    UpdatedBy = "senthil",
                    UpdatedAt = DateTime.Now,
                });
                #endregion

                //#region Partner
                //int partnerId= db.UserRoles.First(p => p.RoleName == "PARTNER").Id;
                //db.Partners.Add(new Partner()
                //{
                //    Id = 0,
                //    PartnerName = "RIA Shipping",
                //    Address1 = "10 Mannadi Street",
                //    Address2 = "Padi",
                //    IsActive=true,
                //    City= "Chennai",
                //    Contact1="Senthil",
                //    Email1 ="k.sendilkumar@gmail.com",
                //    Phone1="9886249389",
                //    ZipCode="600008",

                //    CreatedBy = "Senthil",
                //    CreatedAt = DateTime.Now,
                //    UpdatedBy = "senthil",
                //    UpdatedAt = DateTime.Now,


                //}); ;
                //#endregion
                db.SaveChanges();


            }
        }
        }
}
