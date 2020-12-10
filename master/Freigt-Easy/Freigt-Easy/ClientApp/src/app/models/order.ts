import {VesselCharge} from './vessel-charge'
export class Order {
 
        public orderUNId: string;
        public blCount: number;
        public commodity: string;
        public commodityType: string;
        public qty: number;
        public originFxValue: number;
        public destFxValue: number;
        public orderDate: Date
        public totalCharges: number;
        public rzOrderId: string;
        public rzPaymentId: string;
        public rzSignature: string;
        public vesselChargeId: number;
        public transactionStatus: string;
        public isCreditAllowed: string;
        public id: number;
        public isActive  : boolean;
        public createdBy: string;
        public updatedBy: string;
        public createdAt: Date;
        public updatedAt: Date;
        public rzrKey : null

        public vesselCharge :VesselCharge;
      }
 
