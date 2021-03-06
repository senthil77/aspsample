﻿// <auto-generated />
using System;
using Freigt_Easy.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Freigt_Easy.Migrations
{
    [DbContext(typeof(RiaDBContext))]
    partial class RiaDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Freigt_Easy.Core.Entities.ChargeDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ChargedAtId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ChargedAtId");

                    b.ToTable("ChargeDetails");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.ChargedAt", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ChargedAt");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.Currency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<string>("CurrencyCode")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("BlCount")
                        .HasColumnType("integer");

                    b.Property<string>("Commodity")
                        .HasColumnType("text");

                    b.Property<string>("CommodityType")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<float>("DestFxValue")
                        .HasColumnType("real");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("OrderUNId")
                        .HasColumnType("text");

                    b.Property<float>("OriginFxValue")
                        .HasColumnType("real");

                    b.Property<int>("Qty")
                        .HasColumnType("integer");

                    b.Property<string>("RzOrderId")
                        .HasColumnType("text");

                    b.Property<string>("RzPaymentId")
                        .HasColumnType("text");

                    b.Property<string>("RzSignature")
                        .HasColumnType("text");

                    b.Property<float>("TotalCharges")
                        .HasColumnType("real");

                    b.Property<string>("TransactionStatus")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.Property<int>("VesselChargeId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("VesselChargeId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.Package", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("PackageName")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.Partner", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address1")
                        .HasColumnType("text");

                    b.Property<string>("Address2")
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .HasColumnType("text");

                    b.Property<string>("Contact1")
                        .HasColumnType("text");

                    b.Property<string>("Contact2")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<string>("Email1")
                        .HasColumnType("text");

                    b.Property<string>("Email2")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsCreditAllowed")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsSusbcribed")
                        .HasColumnType("boolean");

                    b.Property<string>("PartnerName")
                        .HasColumnType("text");

                    b.Property<string>("Phone1")
                        .HasColumnType("text");

                    b.Property<string>("Phone2")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("ValidUpTo")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("ZipCode")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Partners");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.Port", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CityCode")
                        .HasColumnType("text");

                    b.Property<string>("CityDescription")
                        .HasColumnType("text");

                    b.Property<string>("CountryCode")
                        .HasColumnType("text");

                    b.Property<string>("CountryDescription")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("LongDescription")
                        .HasColumnType("text");

                    b.Property<string>("PortCode")
                        .HasColumnType("text");

                    b.Property<string>("PortDescription")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Ports");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.QuoteTripCharge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<float>("DestinationCharges")
                        .HasColumnType("real");

                    b.Property<int>("DestinationCurrencyId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<float>("OriginCharges")
                        .HasColumnType("real");

                    b.Property<int>("OriginCurrencyId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.Property<int>("VesselChargeId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DestinationCurrencyId");

                    b.HasIndex("OriginCurrencyId");

                    b.HasIndex("VesselChargeId")
                        .IsUnique();

                    b.ToTable("QuoteTripCharges");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.QuoteTripChargeDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<float>("ChargeAmount")
                        .HasColumnType("real");

                    b.Property<int>("ChargeDetailId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<int>("QuoteTripChargeId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ChargeDetailId");

                    b.HasIndex("QuoteTripChargeId");

                    b.ToTable("QuoteTripChargeDetails");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.ScheduleDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("ExpArrival")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("ExpDeparture")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsDeliveryAvailable")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsLoadingAvailable")
                        .HasColumnType("boolean");

                    b.Property<int>("ScheduleId")
                        .HasColumnType("integer");

                    b.Property<int>("TransitPortId")
                        .HasColumnType("integer");

                    b.Property<string>("TransitRouteNo")
                        .HasColumnType("text");

                    b.Property<string>("TransitTerminal")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ScheduleId");

                    b.HasIndex("TransitPortId");

                    b.ToTable("ScheduleDetails");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("ActivationCode")
                        .HasColumnType("text");

                    b.Property<string>("CompanyName")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<int?>("PartnerId")
                        .HasColumnType("integer");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.Property<int>("UserRoleId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("ValidUpTo")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("PartnerId");

                    b.HasIndex("UserRoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("RoleName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.VesselCharge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<float>("ChargeAmount")
                        .HasColumnType("real");

                    b.Property<string>("ChargeDetail")
                        .HasColumnType("text");

                    b.Property<string>("ChargeType")
                        .HasColumnType("text");

                    b.Property<int>("ChargedAtId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("integer");

                    b.Property<int>("DestinationPortId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<int>("OriginPortId")
                        .HasColumnType("integer");

                    b.Property<int>("PackageId")
                        .HasColumnType("integer");

                    b.Property<int>("PartnerId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.Property<int>("VesselScheduleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ChargedAtId");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("DestinationPortId");

                    b.HasIndex("OriginPortId");

                    b.HasIndex("PackageId");

                    b.HasIndex("PartnerId");

                    b.HasIndex("VesselScheduleId");

                    b.ToTable("VesselCharges");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.VesselSchedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<int>("DestinationPortId")
                        .HasColumnType("integer");

                    b.Property<string>("DestinationTerminal")
                        .HasColumnType("text");

                    b.Property<DateTime>("EstArrDestDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EstArrOriDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EstBerthDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EstCutOffDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EstDepDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EstGateOpenDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<int>("OriginPortId")
                        .HasColumnType("integer");

                    b.Property<string>("OriginTerminal")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.Property<string>("VesselName")
                        .HasColumnType("text");

                    b.Property<string>("VoyageNo")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("DestinationPortId");

                    b.HasIndex("OriginPortId");

                    b.ToTable("VesselSchedules");
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.ChargeDetail", b =>
                {
                    b.HasOne("Freigt_Easy.Core.Entities.ChargedAt", "ChargedAt")
                        .WithMany()
                        .HasForeignKey("ChargedAtId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.Order", b =>
                {
                    b.HasOne("Freigt_Easy.Core.Entities.VesselCharge", "VesselCharge")
                        .WithMany()
                        .HasForeignKey("VesselChargeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.QuoteTripCharge", b =>
                {
                    b.HasOne("Freigt_Easy.Core.Entities.Currency", "DestinationCurrency")
                        .WithMany()
                        .HasForeignKey("DestinationCurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.Currency", "OriginCurrency")
                        .WithMany()
                        .HasForeignKey("OriginCurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.VesselCharge", "VesselCharge")
                        .WithOne("Charges")
                        .HasForeignKey("Freigt_Easy.Core.Entities.QuoteTripCharge", "VesselChargeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.QuoteTripChargeDetail", b =>
                {
                    b.HasOne("Freigt_Easy.Core.Entities.ChargeDetail", "ChargeDetail")
                        .WithMany()
                        .HasForeignKey("ChargeDetailId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.QuoteTripCharge", "QuoteTripCharge")
                        .WithMany("ChargeDetails")
                        .HasForeignKey("QuoteTripChargeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.ScheduleDetail", b =>
                {
                    b.HasOne("Freigt_Easy.Core.Entities.VesselSchedule", "VesselSchedule")
                        .WithMany("Details")
                        .HasForeignKey("ScheduleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.Port", "TransitPort")
                        .WithMany()
                        .HasForeignKey("TransitPortId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.User", b =>
                {
                    b.HasOne("Freigt_Easy.Core.Entities.Partner", "Partner")
                        .WithMany()
                        .HasForeignKey("PartnerId");

                    b.HasOne("Freigt_Easy.Core.Entities.UserRole", "UserRole")
                        .WithMany()
                        .HasForeignKey("UserRoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.VesselCharge", b =>
                {
                    b.HasOne("Freigt_Easy.Core.Entities.ChargedAt", "ChargedAt")
                        .WithMany()
                        .HasForeignKey("ChargedAtId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.Port", "DestinationPort")
                        .WithMany()
                        .HasForeignKey("DestinationPortId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.Port", "OriginPort")
                        .WithMany()
                        .HasForeignKey("OriginPortId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.Package", "Package")
                        .WithMany()
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.Partner", "Partner")
                        .WithMany()
                        .HasForeignKey("PartnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.VesselSchedule", "VesselSchedule")
                        .WithMany()
                        .HasForeignKey("VesselScheduleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Freigt_Easy.Core.Entities.VesselSchedule", b =>
                {
                    b.HasOne("Freigt_Easy.Core.Entities.Port", "DestinationPort")
                        .WithMany()
                        .HasForeignKey("DestinationPortId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Freigt_Easy.Core.Entities.Port", "OriginPort")
                        .WithMany()
                        .HasForeignKey("OriginPortId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
