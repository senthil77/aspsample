import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Package } from 'src/app/models/package';
import { VesselCharge } from 'src/app/models/vessel-charge';
import { VesselHeader } from 'src/app/models/vessel-header';
import { VesselTransits } from 'src/app/models/vessel-transits';
import { ApiClientService } from 'src/app/services/api-client.service';
import { HelperService } from 'src/app/services/helper.service';
import { StoreService } from 'src/app/utils/store-service';
import { PortRoute} from '../../models/port-route';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  data:PortRoute[];
  packages:Package[];
  packageSub:Subscription;
  ToDoListForm:any;
  TransitListForm:any;
  TransitList: VesselTransits[];

  hideBE= false;
  todoList=[{
    "title": "delectus aut autem",
    "completed": false,
    "priority":0
    },
    {
    "title": "quis ut nam facilis et officia qui",
    "completed": false,
    "priority":1
    },
    {
    "title": "fugiat veniam minus",
    "completed": false,
    "priority":2
    },
    {
    "title": "et porro tempora",
    "completed": true,
    "priority":1
    },
    {
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false,
    "priority":0
    }];
  constructor(private apiService:ApiClientService, private helperService:HelperService, private service: StoreService,private formBuilder: FormBuilder) {

     
   }
  calculateDiff(stDate,enDate)
  {
    var dt= this.helperService.calculateDiff(enDate,stDate);
    
    return dt;
  }

  buildVesselCharege(route:PortRoute , partnerId)
  {
    let vessContList: VesselCharge[];
  


      this.packages.forEach(x=>{

        let vc: VesselCharge;

     
         vc.changedAtId =1,
          vc.chargeAmount = 200,
          vc.chargeDetail = "STD",
          vc.packageId = x.id,
          vc.currecyId = 1,//usd 
          vc.startDate = route.StartDate,
          vc.endDate = route.EndDate,
          vc.createdBy = "senthil",
          vc.createdAt = new Date(),
          vc.destinationPortId = route.destinationPortId,
          vc.originPortId = route.originPortId,
          vc.partnerId = partnerId,
          vc.isActive = false,
          vc.vesselScheduleId = route.Schedule.id,
          vc.chargeType = "chargeType",
          vc.updatedAt = new Date(),
          vc.updatedBy = "senthil",

          vessContList.push(vc);
      });
      




       
  }


  getMyData(){
    if(this.ToDoListForm.get('items').length > 0){
    for(let x in this.ToDoListForm.get('items'))
    {
    this.ToDoListForm.get('items').removeAt(x);
    }
    }
    let dat=this.getmyData();
    if(dat.length > 0){
    for(let x in dat)
    {
    this.ToDoListForm.get('items').push(new FormGroup({
    title:new FormControl(dat[x].title,[Validators.required]),
    completed:new FormControl(dat[x].completed,[Validators.required]),
    priority:new FormControl(dat[x].priority,[Validators.required])
    }))
    }}}
   

  getTranistData(){

      if (this.TransitList.length>0 && this.TransitListForm!=undefined)
      {

      if(this.TransitListForm.get('items').length > 0){
        for(let x in this.TransitListForm.get('items'))
        {
        this.TransitListForm.get('items').removeAt(x);
        }
        }
        let dat=this.getExistingTransitData();
        if(dat.length > 0){
        for(let x in dat)
        {
        this.TransitListForm.get('items').push(new FormGroup({

          id: new FormControl(dat[x].id, [Validators.required]),
          scheduleId:new FormControl(dat[x].scheduleId, [Validators.required]),
          transitPortId:new FormControl(dat[x].transitPortId, [Validators.required]),
    transitTerminal: new FormControl(dat[x].transitTerminal, [Validators.required]),
    expArrival: new FormControl(dat[x].expArrival, [Validators.required]),
    expDeparture: new FormControl(dat[x].expDeparture, [Validators.required]),
    isLoadingAvailable: new FormControl(dat[x].isLoadingAvailable, [Validators.required]),
    isDeliveryAvailable: new FormControl(dat[x].isDeliveryAvailable, [Validators.required]),
    transitRouteNo: new FormControl(dat[x].transitRouteNo, [Validators.required]),
    createdBy: new FormControl(dat[x].createdBy, [Validators.required]),
    updatedBy: new FormControl(dat[x].updatedBy, [Validators.required]),
    createdAt: new FormControl(dat[x].createdAt, [Validators.required]),
    updatedAt: new FormControl(dat[x].updatedAt, [Validators.required]),

        

        }))
        }}
    }
  }

   
  ngOnInit(): void {
    
this.TransitListForm=new FormGroup({
items:new FormArray([])
})
    this.ToDoListForm=new FormGroup({
      items:new FormArray([])
      });
      this.getMyData();

     
    let data ={

      code: '30'
    }

    this.apiService.getWithActionColls<PortRoute>('VesselSchedules','getList', data).toPromise().then((data=> 
      {
        console.log(data);
        this.data = data})).catch((err => {console.log(err)}));

        this.packageSub = this.service.activePackages$.subscribe((packData) => {
          this.packages = packData;
        });
      
  }

  getExistingTransitData(){
    return this.TransitList;
  }

  getmyData(){
    return this.todoList;
    }
 

    track(item:any,index:number){
      return index;
      }

      deleteTransitItem(i:number){
        this.TransitListForm.get('items').removeAt(i);
      }

      deleteItem(i:number){
        this.ToDoListForm.get('items').removeAt(i);
        }

        submitTransitDetails()
        {
         // console.log(this.TransitListForm.value.items);
        }

        addTransit(){
          this.TransitListForm.get('items').push(new FormGroup({

            scheduleDetailId: new FormControl(0, [Validators.required]),
            scheduleId:new FormControl(0, [Validators.required]),
            transitPortId:new FormControl(-1, [Validators.required]),
      transitTerminal: new FormControl('', [Validators.required]),
      expArrival: new FormControl('', [Validators.required]),
      expDeparture: new FormControl('', [Validators.required]),
      isLoadingAvailable: new FormControl(false, [Validators.required]),
      isDeliveryAvailable: new FormControl(false, [Validators.required]),
      transitRouteNo: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
      updatedBy: new FormControl(''),
      createdAt: new FormControl(''),
      updatedAt: new FormControl(''),
           
            }));

        }

        submit(){
          console.log(this.ToDoListForm.value.items);
          }


          add(){
            this.ToDoListForm.get('items').push(new FormGroup({
            title:new FormControl("",[Validators.required]),
            completed:new FormControl(false,[Validators.required]),
            priority:new FormControl(0,[Validators.required])
            }))
          }
}
