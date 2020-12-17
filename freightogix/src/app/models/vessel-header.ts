import {VesselTransits} from './vessel-transits';
export class VesselHeader {
 
id:number;
isActive:boolean;
createdBy:string;
updatedBy:string;
createdAt:Date;
updatedAt:Date;
vesselName:string;
voyageNo:string;
originTerminal:string;
estArrOriDate:Date;
estBerthDate:Date;
estGateOpenDate:Date;
estCutOffDate:Date;
estDepDate:Date;
destinationTerminal:string;
estArrDestDate:Date;
originPortId:number;
destinationPortId:number;
vesselTransits :VesselTransits[];
details:any[];
originPort:any;
destinationPort:any;

// get FirstName() : string {
 
//     return this.vesselName;
// }
// set FirstName(value : string) {
   
//     this.vesselName = value;
// } 

}
