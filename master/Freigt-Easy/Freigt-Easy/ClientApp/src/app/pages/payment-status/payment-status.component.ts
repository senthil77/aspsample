import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/models/order';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
rxResponse:any;
orderId:any;

currOrder:Order;
private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private apiService:ApiClientService, private router:Router, private changeDetector : ChangeDetectorRef ) {

 
    if ( this.router.getCurrentNavigation().extras.state!=null)
    {
      var allData = this.router.getCurrentNavigation().extras.state.example;
      this.rxResponse=allData.payResponse;
      this.orderId = allData.orderId;
     // console.log(allData);
      let confirmPayment=
      {
           razorpay_payment_id : this.rxResponse.razorpay_payment_id,
        razorpay_order_id :this.rxResponse.razorpay_order_id,
         razorpay_signature :this.rxResponse.razorpay_signature,
         cart_order_id: this.orderId
      };
      this.apiService.postMethodAction<Order>(confirmPayment,'Order', 'confirm') 
      .toPromise().then((data)=>{
        //console.log(data);
        this.currOrder=data;
        if (data.transactionStatus =="Sucesss")
        {
        this.success=true;  
      }
        else
        {
          this.success=false
        }
        this.changeDetector.detectChanges();
        //console.log(this.success);
      }).catch((err)=> {console.log(err);
        this.success=false;
      });
   
    
    }
    else

    {
      
        this.router.navigate(['./home']);
      
    }
  }
  success:boolean;
  ngOnInit() {
  

     
 
 
   
  }

}


