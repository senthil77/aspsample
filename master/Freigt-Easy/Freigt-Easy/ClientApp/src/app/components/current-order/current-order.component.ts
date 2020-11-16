import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  @Input() itemData: any;
  @Input() searchItem: any;
  @Input() index:any;
  @Input() oriFxVal: any;
  @Input() destFxVal: any;
  transi:any;
  isShowSummary=false;
  private _data = new BehaviorSubject<any[]>([]);
// change data to use getter and setter
isShowDetails=false;
blFee= 'BL fee';
@Input()
set data(value) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
};

get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
}
  constructor(public utils:HelperService,private router: Router) { }

  ngOnInit(): void {
    this.transi= this.utils.getTransits(this.itemData.vesselSchedule, this.itemData.endDate);
this.calculateOrignCharges();
  }
  viewFares(e){ 
    let dataPassed=
    {
      searchData : this.searchItem,
      resultData: e
   
    }
     this.router.navigate(['/fares'], { 
       state: { example: dataPassed } 
     });
   }
  calculateOrignCharges()
  {
    this.itemData.charges.originCharges =this.itemData.charges.chargeDetails.filter(x=>x.chargeDetail.chargedAt.name =='ORIGIN' && x.isActive==true  && x.chargeDetail.name!='BL fee' ).map(this.utils.pick('chargeAmount', 'chargeDetail.name'))
    .reduce((sum, current) => sum + current.chargeAmount * this.searchItem.qty, 0)
    + this.itemData.charges.chargeDetails.filter(x=>x.chargeDetail.chargedAt.name =='ORIGIN' && x.isActive==true  && x.chargeDetail.name=='BL fee' ).map(this.utils.pick('chargeAmount', 'chargeDetail.name'))
    .reduce((sum, current) => sum + current.chargeAmount * this.searchItem.blCount, 0)
    
    ;
    this.itemData.charges.destinationCharges=this.itemData.charges.chargeDetails.filter(x=>x.chargeDetail.chargedAt.name =='DESTINATION' && x.isActive==true ).map(this.utils.pick('chargeAmount', 'chargeDetail.name'))
    .reduce((sum, current) => sum + current.chargeAmount * this.searchItem.qty, 0);

  }


   

}
