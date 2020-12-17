import { Port} from './port';
import { VesselHeader} from './vessel-header'
export class PortRoute {

    
        public   originPortId:number;
        public   destinationPortId :number;
     

 
        public  StartDate : Date;
        public EndDate :Date;


        public  OriginPort :Port;
        public  DestinationPort :Port;
       public  Schedule :VesselHeader;

    
}
