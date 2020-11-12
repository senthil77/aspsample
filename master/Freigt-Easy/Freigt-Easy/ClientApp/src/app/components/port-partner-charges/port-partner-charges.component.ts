import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelMapper } from '../../utils/model-mapper';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Partner } from 'src/app/models/partner';
import { VesselHeader } from 'src/app/models/vessel-header';
import { VesselTransits } from 'src/app/models/vessel-transits';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ApiClientService } from 'src/app/services/api-client.service';
import { StoreService } from '../../utils/store-service';
import {VesselCharge} from '../../models/vessel-charge'
import { HelperService } from 'src/app/services/helper.service';
import { ChargeDetail } from 'src/app/models/charge-detail';
 
import {QuoteTripChargeDetail,ChargedAt,QuoteTripCharge} from '../../models/quote-trip-charge-detail';
import { NotificationService } from 'src/app/services/notification.service';
import { JsonPipe } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-port-partner-charges',
  templateUrl: './port-partner-charges.component.html',
  styleUrls: ['./port-partner-charges.component.css']
})
export class PortPartnerChargesComponent implements OnInit {
  
  constructor(private apiClient:ApiClientService, public filter: FilterPipe, private store: StoreService, private authService:LoginService,
    private fb: FormBuilder, private modalService: NgbModal,private helperService:HelperService, private notify:NotificationService) { }
    chargedAt:ChargedAt[];
    chargedAtSub:Subscription;
    vesselList:any;
  vesscharges:any[];
  currencyList:any;
  currencyListSub:Subscription;
  quoteData:any;
  title = 'modal2';
  editVesselScheduleForm:any;
editQuoteForm: FormGroup;
originalChargeDetails:ChargeDetail[];
hideBE: true;
qcValue:QuoteTripCharge;
  ToDoListForm:any;
  public searchText: string;
 
  public sortDirection :string= 'asc'
  public sortingName: string ='packageId';
  todoList:QuoteTripChargeDetail[
//    {
    // "title": "delectus aut autem",
    // "completed": false,
    // "priority":0
    // },
    // {
    // "title": "quis ut nam facilis et officia qui",
    // "completed": false,
    // "priority":1
    // },
    // {
    // "title": "fugiat veniam minus",
    // "completed": false,
    // "priority":2
    // },
    // {
    // "title": "et porro tempora",
    // "completed": true,
    // "priority":1
    // },
    // {
    //   "title": "quis ut nam facilis et officia qui",
    //   "completed": false,
    //   "priority":1
    //   },
    //   {
    //   "title": "fugiat veniam minus",
    //   "completed": false,
    //   "priority":2
    //   },
    //   {
    //   "title": "et porro tempora",
    //   "completed": true,
    //   "priority":1
    //   },
    //   {
    //     "title": "quis ut nam facilis et officia qui",
    //     "completed": false,
    //     "priority":1
    //     },
    //     {
    //     "title": "fugiat veniam minus",
    //     "completed": false,
    //     "priority":2
    //     },
    //     {
    //     "title": "et porro tempora",
    //     "completed": true,
    //     "priority":1
    //     },
    // {
    // "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    // "completed": false,
    // "priority":0
    // }
  ];
 
  getmyData(){
    return this.todoList;
    }
 

    track(item:any,index:number){
      return index;
      }

      getchargeDetailType(id)
      {

   
        return this.chargedAt.filter(x=>x.id===id).map(x=> x.name)[0];
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
    id:new FormControl(dat[x].id,[Validators.required]),
    chargeDetailId:new FormControl(dat[x].chargeDetailId,[Validators.required]),
    chargeAmount:new FormControl(dat[x].chargeAmount,[Validators.required, Validators.pattern('^[0-9]*$'),Validators.max(25000)]),
    isActive:new FormControl(dat[x].isActive,[Validators.required]),
    createdBy:new FormControl(dat[x].createdBy),
    updatedBy:new FormControl(dat[x].updatedBy),
  chargeDetailName:new FormControl(dat[x].chargeDetail.name),
  chargedAtId: new FormControl(dat[x].chargeDetail.chargedAtId),
  chargeDetailType:new FormControl(this.getchargeDetailType(dat[x].chargeDetail.chargedAtId)),
    createdAt:new FormControl(dat[x].createdAt ),
    updatedAt:new FormControl(dat[x].updatedAt),
    }))
    }}}
 calculateDiff(stDate,enDate)
 {
   var dt= this.helperService.calculateDiff(enDate,stDate);
   
   return dt;
 }

 onchangeVessel(event: Event) {

  const selVessel = (event.target as HTMLSelectElement).value;
 
  this.searchText= selVessel;
  }
 openModal(targetModal,vesselCharge) {
  


  this.todoList =[];
  this.ToDoListForm.get('items').clear();

  
  this.getMyData();


  let data ={

    code: vesselCharge.id
  }

  this.apiClient.getWithAction('QuoteTripCharge', 'test', data).subscribe((res)=> 
  {
    this.quoteData =res;
 
    this.editQuoteForm.patchValue({
      id:this.quoteData.id,
      originCurrencyId:this.quoteData.originCurrencyId,
      destinationCurrencyId:this.quoteData.destinationCurrencyId, 
      originCharges:this.quoteData.originCharges,
      destinationCharges: this.quoteData.destinationCharges,
      vesselChargeId: this.quoteData.vesselChargeId,

           
    });

    this.todoList= this.quoteData.chargeDetails;

 
    this.getMyData();
  }
  
  
  );
  this.title = vesselCharge.vesselSchedule.vesselName + ":" + vesselCharge.originPort.portDescription + '=>' + vesselCharge.destinationPort.portDescription;
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg',

  });
}
 
sort(fieldname)
 {

  if (this.sortDirection == 'asc')
    this.sortDirection= 'desc';
  else
  this.sortDirection= 'asc';
  
   this.sortingName =fieldname;
 }
onSubmit()
{

  var origin = this.chargedAt.find(x=>x.name == 'ORIGIN');
  var dest =this.chargedAt.find(x=>x.name == 'DESTINATION');
 this.qcValue=new ModelMapper(QuoteTripCharge).map(this.editQuoteForm.getRawValue());

 
  this.qcValue.chargeDetails = this.ToDoListForm.value.items;

 //console.log(this.qcValue.chargeDetails);
  // var sum = this.qcValue.chargeDetails.filter(item => item.chargeDetailType === 'ORIGIN')
  //                       .reduce((sum, current) => sum + current.chargeAmount, 0);
   
  this.qcValue.originCharges=  this.qcValue.chargeDetails.filter(item => item.chargeDetailType === 'ORIGIN' && item.isActive==true)
  .reduce((sum, current) => sum + parseFloat(current.chargeAmount.toString()), 0);


  this.qcValue.destinationCharges= this.qcValue.chargeDetails.filter(item => item.chargeDetailType === 'DESTINATION' && item.isActive==true)
  .reduce((sum, current) => sum + parseFloat(current.chargeAmount.toString()), 0);
  //console.log(this.qcValue);


  this.apiClient.postMethod(this.qcValue, 'QuoteTripCharge').toPromise().then((data => { console.log(data); 
  this.notify.showSuccess('updated');
  })).catch((err => { this.notify.showError(JSON.stringify(err)); }))
  this.modalService.dismissAll();

}


 
deleteItem(i:number){
  this.ToDoListForm.get('items').removeAt(i);
  }

  ngOnInit() {

    this.editQuoteForm = this.fb.group({

      id: 0,
      isActive: true,
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],

      originCurrencyId:["", Validators.required],
      destinationCurrencyId: ["", Validators.required,],
      originCharges: ['', Validators.required,],
      destinationCharges: ['', Validators.required],
      vesselChargeId: ['', Validators.required],


    
    });

    let data ={

      isActive: true,
      partnerId: this.authService.currentUser.partnerId,
      roleName: this.authService.currentUser.roleName,
    }
    this.apiClient.getWithActionColls<VesselCharge>('VesselCharge','getActive', data).subscribe((res)=>{
      this.vesscharges= res;

  // console.log(this.vesscharges.map(this.pick('vesselScheduleId', 'vesselSchedule.vesselName')));

  
this.vesselList=this.vesscharges.map(({vesselScheduleId, vesselSchedule: {vesselName}}) => ({vesselScheduleId, vesselName})).filter(
    (thing, i, arr) => arr.findIndex(t => t.vesselScheduleId === thing.vesselScheduleId) === i
  ) ;
    
  }); 


  this.currencyListSub = this.store.activeCurrencies$.subscribe((curenData)=>{
    this.currencyList= curenData;
    //console.log(this.currencyList);
    })

  this.apiClient.get('ChargeDetail').subscribe((res)=>{this.originalChargeDetails= res})
  this.chargedAtSub = this.store.chargedAt$.subscribe((chargedAT) => {
    this.chargedAt = chargedAT;
  });

  this.ToDoListForm=new FormGroup({
    items:new FormArray([])
    });
    //this.getMyData();

   

     
  }
 
}