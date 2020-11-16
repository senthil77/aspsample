import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {ModelMapper} from '../../utils/model-mapper';
import { PortPartnerCharge } from 'src/app/models/port-partner-charge';
import { ApiClientService } from 'src/app/services/api-client.service';
import {HelperService} from '../../services/helper.service';
import { animation, trigger, state, transition, animate, style, group, query, useAnimation, stagger } from '@angular/animations';
@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
  
  animations: [
    trigger('testAnimation', [
      transition('* => *', [
        query('*', style({ opacity: 0 })),
        query('*', stagger('50ms', [animate('1s', style({ opacity: 1 }))]))
      ])
    ])
    /*
    trigger('testAnimation', [
      transition('* => *', [
        query('*', stagger('500ms', useAnimation(fadeAnimation, { params: {duration: '1250ms', to: 1}})))
      ])
    ])
    */    
  ]  

})
export class SearchItemComponent implements OnInit {
  @Input() searchvalues: {};
  noofTranist='No';
  public _data = new BehaviorSubject<any[]>([]);
   
// change data to use getter and setter
@Input()
set data(value) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
};


get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
}
  
  constructor(private router: Router,private apiService:ApiClientService, public utils: HelperService) {
  
   }
 
  public show:boolean = false;
  public buttonName:any = 'View Details';
  superres:PortPartnerCharge;
  ngOnInit(): void {

    //console.log(this._data);
 
  }

  getTransits(itemData)
  {

    return this.utils.getTransits(itemData.vesselSchedule,itemData.endDate);
    
  
  }
  

viewFares(e){ 
 let dataPassed=
 {
   searchData : this.searchvalues,
   resultData: e

 }
  this.router.navigate(['/fares'], { 
    state: { example: dataPassed } 
  });
}

 

showMyContainer: boolean = false;
// showVesselSchedule(event) {
// this.showMyContainer=!this.showMyContainer;
//  var val = (event.target as HTMLButtonElement).textContent;
//   if(val === "Hide Details")   

//   (event.target as HTMLButtonElement).textContent = "View Details"
//     else
//     (event.target as HTMLButtonElement).textContent = "Hide Details"
// }
}
