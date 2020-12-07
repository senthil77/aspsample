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
  constructor(private winRef: WindowRefService, private router:Router,private ngZone: NgZone) {

    if ( this.router.getCurrentNavigation().extras.state!=null)
    {
      var allData = this.router.getCurrentNavigation().extras.state.example;
     
      this.order_id = allData.selectedOrder;
      this.rzrKey= allData.selectedKey
      this.isSuccess=0;
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
      image: './assets/logo.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },

      prefill: {
        name: "senthil Kumar",
        "email": "k.sendilkumar@gmail.com",
        "contact": "9886249389"
    },
      notes: {
        "my_store_id": "ref#123123123",
        "my_user_id": "user_0316"
      },
      theme: {
        color: '#355b83'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);

  
      // call your backend api to verify payment signature & capture transaction

      this.ngZone.run(() => {
        setTimeout(() => {
    
 
          this.router.navigate(['./home']);// ideally this should be Orders
          }, 5000)
        });
    
    });

     
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
 

     
     setTimeout(() => {


      this.router.navigate(['./home']);// ideally this should be Orders and automail
    
      }, 5000);
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}