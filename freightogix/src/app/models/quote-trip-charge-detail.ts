export class QuoteTripChargeDetail
{
chargeDetailId:number;
chargeAmount:number;
quoteTripChargeId:number;
id:number;
isActive:boolean;
createdBy:string;
updatedBy:string;
createdAt:Date;
updatedAt:Date;
chargeDetailType:string;
chargeDetail:ChargeDetail;

}


export class ChargeDetail
{
    chargedAt: ChargedAt;
chargedAtId: number;
createdAt: Date;
createdBy: string;
id: number;
isActive: boolean;
name: string;
updatedAt: Date;
updatedBy: string
}


export class ChargedAt
{
    createdAt: Date;
createdBy: string;
id: number;
isActive: boolean;
name: string;
updatedAt: Date;
updatedBy: string
}


export class QuoteTripCharge
{
originCurrencyId:number;
destinationCurrencyId:number;
originCharges:number;
destinationCharges:number;
vesselChargeId:number;
id:number;
isActive:boolean;
createdBy:string;
updatedBy:string;
createdAt:Date;
updatedAt:Date;
chargeDetails: QuoteTripChargeDetail[];
}
