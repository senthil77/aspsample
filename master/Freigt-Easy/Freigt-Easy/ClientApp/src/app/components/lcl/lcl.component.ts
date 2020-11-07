import {  Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiClientService} from '../../services/api-client.service'
import { ActivatedRoute, Data } from '@angular/router';
 
import { Port } from 'src/app/models/port';
import { StoreService} from '../../utils/store-service';
@Component({
  selector: 'app-lcl',
  templateUrl: './lcl.component.html',
  styleUrls: ['./lcl.component.css']
})
export class LclComponent implements OnInit {

  lclFrm: FormGroup;
  schedules: any[];
  quotes: any[];
  ports: Port[];
  portsSub: Subscription;
  cities:any[];
   constructor(private apiService : ApiClientService,private route: ActivatedRoute,
    private frmBldr: FormBuilder,  private storeService: StoreService) {
this.lclFrm = this.frmBldr.group({
      origin_city: [null, Validators.required],
      destination_city: [null, Validators.required],
      expected_departure: [new Date().toISOString().split('T')[0]],
      ctr_type: ['12 Inches', Validators.required],
      qty: [1, Validators.required],
      bl_count: [1, Validators.required],
      commodity: [null],
      commodity_type: ['haz'],
      period: [7],
    });
  
 

 }
 

  ngOnInit() {
      // this.apiService.get('Port').subscribe((res)=>{
      //   this.cities= res;
        
      // });
     // this.portStore.ports$.subscribe(val => this.cities =val);

      this.portsSub = this.storeService.activePorts$.subscribe((portData) => {
        this.ports = portData;
     
       });

       if (this.ports.length>0)
       {
             this.cities= this.ports.filter(port => port.isActive).            
        map(port => ({ value:port.cityCode, label :port.cityDescription}));
 
        
       }
 
       
  }

  onSubmit() {
  }

}
