import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRefService } from '../../services/window-ref.service';
declare var $:any;
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [WindowRefService]
})


export class PaymentsComponent implements OnInit {
  order_id:any;
  isSuccess:any;
  rzrKey:any;
  orderUid:any;

  primEmail:any;
  primContact:any;
  primPartner:any;
  constructor(private winRef: WindowRefService, private router:Router,private ngZone: NgZone) {

    if ( this.router.getCurrentNavigation().extras.state!=null)
    {
      var allData = this.router.getCurrentNavigation().extras.state.example;
     
      this.order_id = allData.selectedOrder;
      this.rzrKey= allData.selectedKey;
      this.orderUid= allData.selectedUid;
      this.primEmail= allData.email;
      this.primContact= allData.contactNo;
      this.primPartner=allData.partnerName;
      this.isSuccess=0;
      //console.log(allData);
  }
  
  else
  {
    this.router.navigate(['./home']);
  }
}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.payWithRazor(this.order_id);
  }

 

  payWithRazor(val) {
    const options: any = {
      key: this.rzrKey,   
      name: 'FreightoGix', // company name or product name
      description: 'Booking',  // product description
      image: '../../../assets/images/Logo.JPG', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },

      prefill: {
        name: this.primPartner,
        "email": this.primEmail,
        "contact": this.primContact
    },
      notes: {
        "my_store_id": this.orderUid
       
      },
      theme: {
        color: '#355b83'
      }
    };
    options.handler = ((response, error) => {

      let dataPassed={
        orderId: this.orderUid,
        payResponse:null

        }
      if (!error)
      {
        options.response = response;
        //console.log(response);
        dataPassed.payResponse= response;

      }
      else
      {
        dataPassed.payResponse=error;
      }
  
      // console.log(options);

      // console.log(options.error);
      
      // call your backend api to verify payment signature & capture transaction

      this.router.navigate(['./pay-status'], { 
        state: { example: dataPassed } 
      });
    
    });

     
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
 
      this.router.navigate(['./home']);
     
   
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}