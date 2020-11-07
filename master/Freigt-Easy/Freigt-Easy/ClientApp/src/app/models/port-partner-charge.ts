export class PortPartnerCharge {

portId:number;
port:{};
currencyId: number;
currency :{}
partnerId:number;
partner:{}
receivableSum:number;
payableSum:number;
id:number;
stdCharges:StdCharge[];
isActive:boolean;
createdBy:string;
updatedBy:string;
createdAt:Date;
updatedAt:Date;
}



export class StdCharge
{
chargeDetailId:number;
ChargeDetail:{};
chargeAmount:number;
chargeType:string;
portChargeId:number;
id:number;
packageId:number;
package:{}
isActive:boolean;
createdBy:string;
updatedBy:string;
createdAt:Date;
updatedAt:Date;

}