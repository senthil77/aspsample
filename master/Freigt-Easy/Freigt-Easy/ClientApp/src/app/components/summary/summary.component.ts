import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() itemData: any;
  @Input() searchParams: any;
  @Input() oriFxVal: any;
  @Input() destFxVal: any;
  constructor( private utils: HelperService, private router:Router,) { }
  transi:any;
  ngOnInit(): void {

    this.transi= this.utils.getTransits(this.itemData.vesselSchedule, this.itemData.endDate);
  }
  gotoNext() {
   

    let dataPassed=
    {
      selectedOrder : this.itemData,
      searchData: this.searchParams,
      fxOriginCharge: this.oriFxVal,
      fxDestCharge: this.destFxVal,
   
   
    }
 
     this.router.navigate(['/refund'], { 
       state: { example: dataPassed } 
     });
  }

}
