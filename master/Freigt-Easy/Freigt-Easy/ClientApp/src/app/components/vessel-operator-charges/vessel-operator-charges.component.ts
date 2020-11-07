import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelMapper } from '../../utils/model-mapper';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Partner } from 'src/app/models/partner';
import { VesselHeader } from 'src/app/models/vessel-header';
import { VesselTransits } from 'src/app/models/vessel-transits';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ApiClientService } from 'src/app/services/api-client.service';
import { StoreService } from '../../utils/store-service';
import {VesselCharge} from '../../models/vessel-charge'
import { HelperService } from 'src/app/services/helper.service';
import {NotificationService} from '../../services/notification.service'
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-vessel-operator-charges',
  templateUrl: './vessel-operator-charges.component.html',
  styleUrls: ['./vessel-operator-charges.component.css']
})
export class VesselOperatorChargesComponent implements OnInit {
 
  constructor(private apiClient:ApiClientService, public filter: FilterPipe, private store: StoreService, private authService:LoginService,
    private fb: FormBuilder, private modalService: NgbModal,private helperService:HelperService, private notifyService: NotificationService) { }
    public searchText: string;
    public sortDirection :string= 'asc'
    public sortingName: string ='packageId';
 
  partnerList:Partner[];
  vesselList:VesselHeader[];
  vesscharges:any[];
  currencyList:any;
  currencyListSub:Subscription;
  title = 'modal2';
 editVesselChargeForm: FormGroup;
  vesselDetail:VesselCharge;
  vesschargesSub= new Subject<any[]>();
  vesschargesSubscription: Subscription;
  chargedAt:any[];
  chargedAtSub:Subscription;
 openModal(targetModal,vesselCharge) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
  });
 
  if (vesselCharge!=null)  {  
    vesselCharge.isActive= true;
    this.vesselDetail = vesselCharge; 
    this.editVesselChargeForm.patchValue({
      chargeDetail:vesselCharge.chargeDetail,
      chargedAtId:vesselCharge.chargedAtId,
      chargeAmount:vesselCharge.chargeAmount,
      chargeType:vesselCharge.chargeType,
      packageId:vesselCharge.packageId,
      startDate:vesselCharge.startDate,
      endDate: vesselCharge.endDate,
 
      vesselScheduleId:vesselCharge.vesselScheduleId,
      partnerId:vesselCharge.partnerId,
      currencyId:vesselCharge.currencyId,
      originPortId:vesselCharge.originPortId,
      destinationPortId:vesselCharge.destinationPortId,
      id:vesselCharge.id,
      isActive:vesselCharge.isActive,
      createdBy:vesselCharge.createdBy,
      updatedBy:vesselCharge.updatedBy,
      createdAt:vesselCharge.createdAt,
      updatedAt:vesselCharge.updatedAt,
  });
 
}
else {
  this.editVesselChargeForm.patchValue({
chargeDetail:'',
chargedAtId:'',
chargeAmount:'',
chargeType:'',
packageId:'',
startDate:'',
endDate: '',

vesselScheduleId:'',
partnerId:'',
currencyId:'',
originPortId:'',
destinationPortId:'',
id:'',
isActive:'',
createdBy:'',
updatedBy:'',
createdAt:'',
updatedAt:'',
    });
 }
}
onchangeVessel(event: Event) {

  const selVessel = (event.target as HTMLSelectElement).value;
  this.searchText= selVessel;
  }
onSubmit() {

  
var vesId = this.editVesselChargeForm.getRawValue()['id'];

 
  this.apiClient.postMethod(this.editVesselChargeForm.value, 'VesselCharge').toPromise().then((data => {
    this.vesselDetail = new ModelMapper(VesselCharge).map(data); 
    console.log(data);

  
//PackageId//VesselScheduleId
    this.vesscharges = this.vesscharges.map(u => u.vesselScheduleId == this.vesselDetail.vesselScheduleId && u.partnerId == this.vesselDetail.partnerId
      && u.packageId == this.vesselDetail.packageId && u.originPortId == this.vesselDetail.originPortId && u.destinationPortId == this.vesselDetail.destinationPortId? data: u);
  
      //this.vesscharges.push(this.vesselDetail);  
      this.notifyService.showSuccess('updated');
   
   
    })).catch((err=> {     this.notifyService.showError("Promise rejected with " + JSON.stringify(err));}))

    this.modalService.dismissAll();
 }
 sort(fieldname)
 {

  if (this.sortDirection == 'asc')
    this.sortDirection= 'desc';
  else
  this.sortDirection= 'asc';
  
   this.sortingName =fieldname;
 }
 calculateDiff(stDate,enDate)
 {
   var dt= this.helperService.calculateDiff(enDate,stDate);
   
   return dt;
 }
  ngOnInit() {

    this.editVesselChargeForm = this.fb.group({
      chargeDetail: [''],
      chargedAtId: [''],
      chargeAmount: [''],
      chargeType: [''],
      packageId: [''],
      vesselScheduleId: [''],
      partnerId: [''],
      currencyId: [''],
      originPortId: [''],
      destinationPortId: [''],
      id: [''],
      isActive: [''],
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],
      startDate:[''],
      endDate: ['']
       });


       let data ={

      isActive: false,
        partnerId: this.authService.currentUser.partnerId
      }
      this.apiClient.getWithActionColls<VesselCharge>('VesselCharge','getActive', data).subscribe((res)=>{
        this.vesscharges= res;
      });



  //   this.apiClient.get('VesselCharge').subscribe((res)=>{
  //     this.vesscharges= res;
  //     console.log(this.vesscharges);
   
  // });
    this.apiClient.get('VesselSchedules').subscribe((res)=>{
      this.vesselList= res;
     

    });

    this.apiClient.get('Partner').subscribe((res)=>{
      this.partnerList= res;
    
    });

 
    this.currencyListSub = this.store.activeCurrencies$.subscribe((curenData)=>{
    this.currencyList= curenData;
    })


    this.chargedAtSub = this.store.chargedAt$.subscribe((chargedAT) => {
      this.chargedAt = chargedAT;
    });
  
     
  }

}
