using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Freigt_Easy.Migrations
{
    public partial class initialcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChargedAt",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChargedAt", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Currencies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    CurrencyCode = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    PackageName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Partners",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    PartnerName = table.Column<string>(nullable: true),
                    Address1 = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    Email1 = table.Column<string>(nullable: true),
                    Email2 = table.Column<string>(nullable: true),
                    Phone1 = table.Column<string>(nullable: true),
                    Phone2 = table.Column<string>(nullable: true),
                    Contact1 = table.Column<string>(nullable: true),
                    Contact2 = table.Column<string>(nullable: true),
                    IsSusbcribed = table.Column<bool>(nullable: false),
                    ValidUpTo = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    PortCode = table.Column<string>(nullable: true),
                    CityCode = table.Column<string>(nullable: true),
                    CountryCode = table.Column<string>(nullable: true),
                    CityDescription = table.Column<string>(nullable: true),
                    PortDescription = table.Column<string>(nullable: true),
                    LongDescription = table.Column<string>(nullable: true),
                    CountryDescription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChargeDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    ChargedAtId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChargeDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChargeDetails_ChargedAt_ChargedAtId",
                        column: x => x.ChargedAtId,
                        principalTable: "ChargedAt",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VesselSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    VesselName = table.Column<string>(nullable: true),
                    VoyageNo = table.Column<string>(nullable: true),
                    OriginTerminal = table.Column<string>(nullable: true),
                    EstArrOriDate = table.Column<DateTime>(nullable: false),
                    EstBerthDate = table.Column<DateTime>(nullable: false),
                    EstGateOpenDate = table.Column<DateTime>(nullable: false),
                    EstCutOffDate = table.Column<DateTime>(nullable: false),
                    EstDepDate = table.Column<DateTime>(nullable: false),
                    DestinationTerminal = table.Column<string>(nullable: true),
                    EstArrDestDate = table.Column<DateTime>(nullable: false),
                    OriginPortId = table.Column<int>(nullable: false),
                    DestinationPortId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VesselSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VesselSchedules_Ports_DestinationPortId",
                        column: x => x.DestinationPortId,
                        principalTable: "Ports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VesselSchedules_Ports_OriginPortId",
                        column: x => x.OriginPortId,
                        principalTable: "Ports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    CompanyName = table.Column<string>(nullable: true),
                    ActivationCode = table.Column<string>(nullable: true),
                    UserRoleId = table.Column<int>(nullable: false),
                    PartnerId = table.Column<int>(nullable: true),
                    ValidUpTo = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Users_UserRoles_UserRoleId",
                        column: x => x.UserRoleId,
                        principalTable: "UserRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ScheduleDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    TransitTerminal = table.Column<string>(nullable: true),
                    ExpArrival = table.Column<DateTime>(nullable: false),
                    ExpDeparture = table.Column<DateTime>(nullable: false),
                    IsLoadingAvailable = table.Column<bool>(nullable: false),
                    IsDeliveryAvailable = table.Column<bool>(nullable: false),
                    TransitRouteNo = table.Column<string>(nullable: true),
                    ScheduleId = table.Column<int>(nullable: false),
                    TransitPortId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScheduleDetails_VesselSchedules_ScheduleId",
                        column: x => x.ScheduleId,
                        principalTable: "VesselSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ScheduleDetails_Ports_TransitPortId",
                        column: x => x.TransitPortId,
                        principalTable: "Ports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VesselCharges",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    ChargeDetail = table.Column<string>(nullable: true),
                    ChargedAtId = table.Column<int>(nullable: false),
                    ChargeAmount = table.Column<float>(nullable: false),
                    ChargeType = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    VesselScheduleId = table.Column<int>(nullable: false),
                    PartnerId = table.Column<int>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false),
                    OriginPortId = table.Column<int>(nullable: false),
                    DestinationPortId = table.Column<int>(nullable: false),
                    PackageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VesselCharges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VesselCharges_ChargedAt_ChargedAtId",
                        column: x => x.ChargedAtId,
                        principalTable: "ChargedAt",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VesselCharges_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VesselCharges_Ports_DestinationPortId",
                        column: x => x.DestinationPortId,
                        principalTable: "Ports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VesselCharges_Ports_OriginPortId",
                        column: x => x.OriginPortId,
                        principalTable: "Ports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VesselCharges_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VesselCharges_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VesselCharges_VesselSchedules_VesselScheduleId",
                        column: x => x.VesselScheduleId,
                        principalTable: "VesselSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuoteTripCharges",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    OriginCurrencyId = table.Column<int>(nullable: false),
                    DestinationCurrencyId = table.Column<int>(nullable: false),
                    OriginCharges = table.Column<float>(nullable: false),
                    DestinationCharges = table.Column<float>(nullable: false),
                    VesselChargeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuoteTripCharges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuoteTripCharges_Currencies_DestinationCurrencyId",
                        column: x => x.DestinationCurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuoteTripCharges_Currencies_OriginCurrencyId",
                        column: x => x.OriginCurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuoteTripCharges_VesselCharges_VesselChargeId",
                        column: x => x.VesselChargeId,
                        principalTable: "VesselCharges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuoteTripChargeDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    ChargeDetailId = table.Column<int>(nullable: false),
                    ChargeAmount = table.Column<float>(nullable: false),
                    QuoteTripChargeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuoteTripChargeDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuoteTripChargeDetails_ChargeDetails_ChargeDetailId",
                        column: x => x.ChargeDetailId,
                        principalTable: "ChargeDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuoteTripChargeDetails_QuoteTripCharges_QuoteTripChargeId",
                        column: x => x.QuoteTripChargeId,
                        principalTable: "QuoteTripCharges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChargeDetails_ChargedAtId",
                table: "ChargeDetails",
                column: "ChargedAtId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteTripChargeDetails_ChargeDetailId",
                table: "QuoteTripChargeDetails",
                column: "ChargeDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteTripChargeDetails_QuoteTripChargeId",
                table: "QuoteTripChargeDetails",
                column: "QuoteTripChargeId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteTripCharges_DestinationCurrencyId",
                table: "QuoteTripCharges",
                column: "DestinationCurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteTripCharges_OriginCurrencyId",
                table: "QuoteTripCharges",
                column: "OriginCurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteTripCharges_VesselChargeId",
                table: "QuoteTripCharges",
                column: "VesselChargeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleDetails_ScheduleId",
                table: "ScheduleDetails",
                column: "ScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleDetails_TransitPortId",
                table: "ScheduleDetails",
                column: "TransitPortId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_PartnerId",
                table: "Users",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserRoleId",
                table: "Users",
                column: "UserRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselCharges_ChargedAtId",
                table: "VesselCharges",
                column: "ChargedAtId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselCharges_CurrencyId",
                table: "VesselCharges",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselCharges_DestinationPortId",
                table: "VesselCharges",
                column: "DestinationPortId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselCharges_OriginPortId",
                table: "VesselCharges",
                column: "OriginPortId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselCharges_PackageId",
                table: "VesselCharges",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselCharges_PartnerId",
                table: "VesselCharges",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselCharges_VesselScheduleId",
                table: "VesselCharges",
                column: "VesselScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselSchedules_DestinationPortId",
                table: "VesselSchedules",
                column: "DestinationPortId");

            migrationBuilder.CreateIndex(
                name: "IX_VesselSchedules_OriginPortId",
                table: "VesselSchedules",
                column: "OriginPortId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuoteTripChargeDetails");

            migrationBuilder.DropTable(
                name: "ScheduleDetails");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "ChargeDetails");

            migrationBuilder.DropTable(
                name: "QuoteTripCharges");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "VesselCharges");

            migrationBuilder.DropTable(
                name: "ChargedAt");

            migrationBuilder.DropTable(
                name: "Currencies");

            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DropTable(
                name: "Partners");

            migrationBuilder.DropTable(
                name: "VesselSchedules");

            migrationBuilder.DropTable(
                name: "Ports");
        }
    }
}
