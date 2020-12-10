import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribeComponent } from 'src/app/components/subscribe/subscribe.component';
import { ApiClientService } from 'src/app/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cancel-refund',
  templateUrl: './cancel-refund.component.html',
  styleUrls: ['./cancel-refund.component.css']
})
export class CancelRefundComponent implements OnInit {
  @Input() itemData: any;
  @Input() searchParams: any;
  @Input() oriFxVal: any;
  @Input() destFxVal: any;
  constructor(private currency:CurrencyPipe) {
 
  }

 totalCharges:any;
  ngOnInit() {


    this.totalCharges = (((this.itemData.chargeAmount *this.searchParams.qty) + (this.itemData.charges.destinationCharges/this.destFxVal) 
      + (this.itemData.charges.originCharges/this.oriFxVal))) *this.oriFxVal;
      
      
 
  }

}
