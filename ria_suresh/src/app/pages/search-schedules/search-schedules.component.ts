import { Component, OnInit } from '@angular/core';
import { Subscription,Subject} from 'rxjs';
 
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiClientService} from '../../services/api-client.service';
import { Port } from 'src/app/models/port';
import { StoreService } from 'src/app/utils/store-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
@Component({
  selector: 'app-search-schedules',
  templateUrl: './search-schedules.component.html',
  styleUrls: ['./search-schedules.component.css']
})
export class SearchSchedulesComponent implements OnInit {
  isShow=false;
  cities: any[];
  schlFrm: FormGroup;
  originPorts:Port[];
  destPorts:Port[];
  originPortsSub:Subscription;
  destPortsSub:Subscription;
 searchResults:any[];
   isChecked=true; //if true haz else non haz
   citySub: Subscription;
   isSubmitted = false;
   constructor( private frmBldr: FormBuilder,private apiService : ApiClientService, private store:StoreService,private modalService: NgbModal) { 
   this.schlFrm = this.frmBldr.group({
     originCity: ['', Validators.required],
     destinationCity: ['', Validators.required],
     expectedDeparture: [new Date().toISOString().split('T')[0]],
     period: [ 7 ,[Validators.required, Validators.maxLength(2)]],
   }); }
   ngOnInit() {
 
      
     this.originPortsSub= this.store.activePorts$.subscribe(PortData=>
      this.originPorts=PortData
      );

      this.destPortsSub= this.store.activePorts$.subscribe(portData=>
        
        this.destPorts= portData);
  
   
   }
   onCityChange(event: Event) {

    const selCity = (event.target as HTMLSelectElement).value;
    const portControl = (event.target as HTMLSelectElement).getAttribute(
      'FormControlName'
    );
 
    switch (portControl) {
      case 'originCity': {
       
  
        this.destPorts = this.originPorts.filter((item)=> item.portCode !==selCity);
     
        break;
      }
      // case 'destinationCity': {
      //   this.destPorts = this.cities.filter(
      //     (item) => item.cityCode === selCity
      //   );
  
       
      //   break;
      // }
    
   }
  }

  get searchFormControl() { return this.schlFrm.controls; }  

  showForm ()
  {
     
      $('#myModal').modal({show:true});
  
  }
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
   onSubmit(){
 

 
    this.isSubmitted = true;
    if (!this.schlFrm.valid) {
      return false;
    } else {

      this.apiService.postMethodAction(this.schlFrm.value, 'VesselSchedules','searchschedule').toPromise().then((data) => {
        { 
          this.searchResults=data; 
          this.toggleDisplay();
        }
      
      
      }).catch((error) => {
      
        console.log('Promise rejected with ' + JSON.stringify(error));
      
      });    ;
      
    }
 
 
 
   }

}
