 import {Partner} from './partner';
export class VesselCharge
{
chargeDetail:string;
changedAtId:number;
chargeAmount: number;
chargeType:string;
packageId:number;
vesselScheduleId:number;
partnerId:number;
currecyId:number;
originPortId:number;
destinationPortId:number;
id:number;
isActive:boolean;
createdBy:string;
updatedBy:string;
createdAt:Date;
updatedAt:Date;
startDate:Date;
endDate: Date
transitDays:number;
partner:Partner;
}