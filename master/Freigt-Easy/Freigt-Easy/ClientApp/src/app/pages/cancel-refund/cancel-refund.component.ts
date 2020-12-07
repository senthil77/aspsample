import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribeComponent } from 'src/app/components/subscribe/subscribe.component';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-cancel-refund',
  templateUrl: './cancel-refund.component.html',
  styleUrls: ['./cancel-refund.component.css']
})
export class CancelRefundComponent implements OnInit {
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
 
 console.log(this.itemData);
}
else
{

  this.router.navigate(['/home']);

}
  }

  bookMyOrder()
  {
    this.apiService.postMethodAction('','Payment', 'initialize').toPromise().then((succ)=>{

      console.log(succ);
    }).catch((err)=>{
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
