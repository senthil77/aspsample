import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';
import { HelperService } from 'src/app/services/helper.service';
import {Order} from '../../models/order'
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
  @Input() mode: any;
  constructor( private utils: HelperService, private router:Router,private apiService:ApiClientService) { }
  transi:any;
  ngOnInit(): void {

    this.transi= this.utils.getTransits(this.itemData.vesselSchedule, this.itemData.endDate);
  }

  totalCharges:any;
  createOrder(isCreditFutureAllowed)
  {

  
    this.totalCharges =(this.itemData.charges.originCharges/this.oriFxVal  + this.itemData.charges.destinationCharges/this.destFxVal+ this.itemData.chargeAmount *this.searchParams.qty)*this.oriFxVal;

    let orderData={
      id:0,
      isActive:true,
      createdBy:null,
      updatedBy:null,
      createdAt:null,
      updatedAt:null,
      orderUNId:null,
      blCount: this.searchParams.blCount,
      commodity:null,
      commodityType:null,
      qty:this.searchParams.qty,
      originFxValue:this.oriFxVal,
      destFxValue:this.destFxVal,
      orderDate:new Date(),
      isCreditAllowed:isCreditFutureAllowed,
      totalCharges:this.totalCharges,
      rzOrderId:null,
      rzPaymentId:null,

      vesselChargeId:  this.itemData.id,
 
 
 
    }

    
   console.log(this.totalCharges);
   console.log(orderData);

   this.apiService.postMethod<Order>(orderData,'order').toPromise().then((data)=>{console.log(data.vesselCharge);
  this.gotoNext(data.rzOrderId,data.rzrKey,data.orderUNId,data.vesselCharge.partner.email1,data.vesselCharge.partner.phone1, data.vesselCharge.partner.partnerName)
  }).catch((err)=>{console.log(err);})
  }

  gotoNextOld() {
   

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
  gotoNext(orderId,key,orderUid,email,contact,partnerName) {
   

    let dataPassed=
    {
      selectedOrder : orderId,
      selectedKey:key,
      selectedUid:orderUid,
      email:email,
      contactNo:contact,
      partnerName:partnerName
      
   
   
    }
 
     this.router.navigate(['/payment'], { 
       state: { example: dataPassed } 
     });
  }

}
