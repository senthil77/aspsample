import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-cancel-refund',
  templateUrl: './cancel-refund.component.html',
  styleUrls: ['./cancel-refund.component.css']
})
export class CancelRefundComponent implements OnInit {
  item:any;
  searchParams:any;
  oriFxVal:number;
  destFxVal:number;
  constructor(private apiService:ApiClientService, private router:Router) {

    if ( this.router.getCurrentNavigation().extras.state!=null)
{
  var allData = this.router.getCurrentNavigation().extras.state.example;

    this.item = allData.selectedOrder;
    this.searchParams = allData.searchData;
    this.oriFxVal = allData.fxOriginCharge;
    this.destFxVal= allData.fxDestCharge;
//  console.log(allData);
}
else
{

  this.router.navigate(['/home']);

}
  }

  ngOnInit() {
  }

}
