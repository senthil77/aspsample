import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription,Subject, BehaviorSubject} from 'rxjs';
import { ActivatedRoute, Data,Router } from '@angular/router';
import { ApiClientService} from '../../services/api-client.service';
import { Port } from 'src/app/models/port';
 
import { StoreService } from 'src/app/utils/store-service';
import { NotificationService } from 'src/app/services/notification.service';
 

@Component({
  selector: 'app-fcl',
  templateUrl: './fcl.component.html',
  styleUrls: ['./fcl.component.css']
})
export class FclComponent implements OnInit {
  packages:any[];
  packagesSub:Subscription;
  fclFrm: FormGroup;
  schedules: any[];
  quotes: any[];
  cities: any[];
  originPorts:  Port[];
  destPorts:  Port[];
  searchResults:any[]=[];
  isChecked=true; //if true haz else non haz
  
  originPortsSub:Subscription;
  destPortsSub:Subscription;
 
  public show:boolean = false;
  public buttonName:any = 'View Details';
  isSubmitted = false;
  minv=1;
  isShow = false;
  constructor(private route: ActivatedRoute,private apiService : ApiClientService,
    private frmBldr: FormBuilder, private router: Router,private portStore: StoreService, private notify:NotificationService) {


  this.fclFrm = this.frmBldr.group({
      originCity: ['', Validators.required],
      destinationCity: ['', Validators.required],
      expectedDeparture: [new Date().toISOString().split('T')[0]],
      packageId: ['', Validators.required],
      qty: [1, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      blCount:  [1,  [Validators.required, Validators.pattern('^[1-9][0-9]*$') ]],
      commodity: [null],
      commodityType:'Non Hazordous',
      period: [7],
    }); }
    customMax: 0;
    validate(c: FormControl): {[key: string]: any} {
      let v = c.value;
      return ( v > this.customMax)? {"customMax": true} : null;
  }
    get originCity() {
      return this.fclFrm.get('originCity');
    }

    toggleDisplay() {
      this.isShow = !this.isShow;
    }
  ngOnInit()   {

    this.originPortsSub = this.portStore.activePorts$.subscribe((portData) => {
      this.originPorts = portData;
   
     });
     this.destPortsSub = this.portStore.activePorts$.subscribe((portData) => {
      this.destPorts = portData;
   
     });


     if (this.originPorts.length>0)
     {
           this.cities= this.originPorts.filter(port => port.isActive).            
      map(port => ({ value:port.cityCode, label :port.cityDescription}));
 
      
     }

     this.packagesSub = this.portStore.activePackages$.subscribe((pckData)=>{
       this.packages= pckData;
     })

  }

 

  model : any={}; 
  onSubmit() {
 

 
    this.isSubmitted = true;
    if (!this.fclFrm.valid) {
      return false;
    } else {

      //this.router.navigateByUrl('/searchItems');
      
      // this.router.navigate(['/searchResults'], { 
      //   state: { example: this.fclFrm.value } 
      // });
      this.searchResults=[];
      this.apiService.postMethodAction(this.fclFrm.value, 'VesselCharge','search').toPromise().then((data) => {
        { 
         
          this.searchResults.length=0;
          this.searchResults=data;
      
          this.toggleDisplay();
       
         }
      }).catch((error) => {
        this.notify.showError(JSON.stringify(error));
      });
    }

 

    
}

get fclFormControl() { return this.fclFrm.controls; }  
viewFares(){ 
  this.router.navigateByUrl('/fares');
}

calculateStandardCharges(lstStdCharges){
 var chargeAmt=0;
 var currencycode='';
  
 if (lstStdCharges!=null)
 {
   lstStdCharges.forEach(element => {
   
  currencycode= element.currency.currencyCode;
 chargeAmt = chargeAmt+  element.chargeAmount;

   });
   
 }
 
 return currencycode + '-' + chargeAmt;

}
calculateDiff(sentDate,sentDate2) {
 var date1:any = new Date(sentDate2);
 var date2:any = new Date(sentDate);
 var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

 return diffDays;
}

showVesselSchedule() {
 this.show = !this.show;

 // CHANGE THE NAME OF THE BUTTON.
 if(this.show)  
   this.buttonName = "Hide Details";
 else
   this.buttonName = "View Details";
}


onCityChange(event: Event) {

  const selCity = (event.target as HTMLSelectElement).value;
  const portControl = (event.target as HTMLSelectElement).getAttribute(
    'FormControlName'
  );
 
  switch (portControl) {
    case 'originCity': {
     

      this.destPorts = this.originPorts.filter((item)=> item.id.toString() !==selCity);
   
      break;
    }
    
  
 }



}
}
