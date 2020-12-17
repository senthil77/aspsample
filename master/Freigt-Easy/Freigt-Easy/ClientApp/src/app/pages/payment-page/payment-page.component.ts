import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  itemData:any;
  searchParams:any;
  originSummary:any;
  destinationSummary:any;
  oriFxVal:number;
  destFxVal:number;
  constructor(private apiService:ApiClientService, private router:Router) {

    if ( this.router.getCurrentNavigation().extras.state!=null)
{
  var allData = this.router.getCurrentNavigation().extras.state.example;
 
  this.itemData = allData.selectedOrder;
  this.searchParams=allData.searchData;
  this.oriFxVal=allData.fxOriginCharge;
  this.destFxVal=allData.fxDestCharge;
 
 //console.log(this.itemData);
}
else
{

  this.router.navigate(['/home']);

}
  }
  ngOnInit(): void {
  }

}
