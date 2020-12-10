import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Port } from '../../../models/port';
import { VesselHeader } from '../../../models/vessel-header';
import { VesselTransits } from '../../../models/vessel-transits';
import { ApiClientService } from '../../../services/api-client.service';
import { StoreService } from '../../../utils/store-service';

@Component({
  selector: 'app-vessel-details',
  templateUrl: './vessel-details.component.html',
  styleUrls: ['./vessel-details.component.css']
})
export class VesselDetailsComponent implements OnInit {


  constructor(private apiClient: ApiClientService, private router: Router, private frmBldr: FormBuilder,
    private utils: StoreService,
    private modalService: NgbModal,
    private dp: DatePipe) { }
  vesselScheduleList: VesselHeader[];
  editVesselScheduleForm: FormGroup;
  portsSub: Subscription;
  ports: Port[];
  transitPorts: any;
  originPorts: any;
  destPorts: any;
  cities: any[];
  orginCities: any[];
  destCities: any[];
  controls: FormArray;
  vslSchedule: VesselHeader;

  selected: string[] = [];



  TransitListForm: any;
  TransitList: VesselTransits[];

  // openModal(x)  {     
  //   this.router.navigateByUrl('/vessel', { state: x });

  // }

  formatDate(dtValue: Date) {
    //return new Date(dtValue).toISOString().slice(0,10);
    let myDate = dtValue.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    return this.dp.transform(myDate, 'yyyy-MM-dd', 'es-ES');




  }

  getCurrentDate() {
    const date = new Date();
return  date.toLocaleDateString('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric'
}).replace(/ /g, '-');



  }

  ngOnInit(): void {

 
    this.TransitListForm = new FormGroup({
      items: new FormArray([])
    })

    this.editVesselScheduleForm = this.frmBldr.group({

      id: 0,
      isActive: true,
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],
      vesselName: ['', Validators.required,],
      voyageNo: ['', Validators.required],
      originCity: ['', Validators.required],
      destinationCity: ['', Validators.required],
      originTerminal: [''],
      estArrOriDate: [''],
      estBerthDate: [''],
      estGateOpenDate: [''],
      estCutOffDate: [''],
      estDepDate: ['', Validators.required],
      destinationTerminal: [''],
      estArrDestDate: ['', Validators.required],
      originPortId: ['', Validators.required],
      destinationPortId: ['', Validators.required],
    });

    this.portsSub = this.utils.activePorts$.subscribe(data =>
      this.ports = data
    );

    this.portsSub = this.utils.activePorts$.subscribe(data =>
      this.originPorts = data
    );


    this.portsSub = this.utils.activePorts$.subscribe(data =>
      this.destPorts = data
    );

    this.portsSub = this.utils.activePorts$.subscribe(data =>
      this.transitPorts = data
    );
    this.portsSub = this.utils.activePorts$.subscribe(data =>
      this.cities = data.map(obj => ({ value: obj.cityCode, label: obj.cityDescription }))

    );
    this.portsSub = this.utils.activePorts$.subscribe(data =>
      this.orginCities = data.map(obj => ({ value: obj.cityCode, label: obj.cityDescription }))

    );

    this.portsSub = this.utils.activePorts$.subscribe(data =>
      this.destCities = data.map(obj => ({ value: obj.cityCode, label: obj.cityDescription }))

    );






    this.editVesselScheduleForm = this.frmBldr.group({

      id: 0,
      isActive: true,
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],
      vesselName: ['', [Validators.required]],
      voyageNo: ['', [Validators.required]],
      originCity: ['',[Validators.required] ],
      destinationCity: [''],
      originTerminal: [''],
      estArrOriDate: [ new Date().toISOString().split('T')[0]],
      estBerthDate: [ new Date().toISOString().split('T')[0]],
      estGateOpenDate: [new Date().toISOString().split('T')[0]],
      estCutOffDate: [new Date().toISOString().split('T')[0]],
      estDepDate: [new Date().toISOString().split('T')[0], Validators.required,],
      destinationTerminal: [''],
      estArrDestDate: [new Date().toISOString().split('T')[0], Validators.required,],
      originPortId: ['', Validators.required],
      destinationPortId: ['', Validators.required,],
    });

    this.apiClient.get('VesselSchedules').subscribe((res) => {
      this.vesselScheduleList = res;
 
     

    });

  }


  onPortChange() {
    this.selected.length = 0;

    if (this.editVesselScheduleForm.getRawValue()['originPortId'] > 0) {

      this.selected.push(this.editVesselScheduleForm.getRawValue()['originPortId'])

    }

    if (this.editVesselScheduleForm.getRawValue()['destinationPortId'] > 0) {

      this.selected.push(this.editVesselScheduleForm.getRawValue()['destinationPortId'])

    }


    console.log(this.selected);

    this.transitPorts = this.ports.filter((port) => !this.selected.includes(port.id.toString()));



    console.log(this.transitPorts);
  }
  onCityChange(event: Event) {

    const selCity = (event.target as HTMLSelectElement).value;
    const portControl = (event.target as HTMLSelectElement).getAttribute(
      'FormControlName'
    );

    switch (portControl) {
      case 'originCity': {
        this.originPorts = this.ports.filter(
          (item) => item.cityCode === selCity
        );

        this.destCities = this.cities.filter((item) => item.value !== selCity);

        break;
      }
      case 'destinationCity': {
        this.destPorts = this.ports.filter(
          (item) => item.cityCode === selCity
        );

        this.orginCities = this.cities.filter((item) => item.value !== selCity);
        break;
      }

    }
  }

  openModal(targetModal, vesselSchedule) {
    
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg',

    });



    if (vesselSchedule != null) {
      console.log(vesselSchedule);

 
      this.editVesselScheduleForm.patchValue({
        vesselName: vesselSchedule.vesselName,
        voyageNo: vesselSchedule.voyageNo,
        originCity: vesselSchedule.originPort.cityCode,
        originTerminal: vesselSchedule.originTerminal,
        estArrOriDate: this.formatDate(vesselSchedule.estArrOriDate),
        estBerthDate: this.formatDate(vesselSchedule.estBerthDate),
        estGateOpenDate: this.formatDate(vesselSchedule.estGateOpenDate),
        estCutOffDate: this.formatDate(vesselSchedule.estCutOffDate),
        estDepDate: this.formatDate(vesselSchedule.estDepDate),
        destinationTerminal: vesselSchedule.destinationTerminal,
        estArrDestDate: this.formatDate(vesselSchedule.estArrDestDate),
        originPortId: vesselSchedule.originPortId,
        destinationCity: vesselSchedule.destinationPort.cityCode,
        destinationPortId: vesselSchedule.destinationPortId,
        id: vesselSchedule.id,
        isActive: vesselSchedule.isActive,
        createdBy: vesselSchedule.createdBy,
        updatedBy: vesselSchedule.updatedBy,


      });

 
      this.TransitListForm.get('items').clear();
 
      this.TransitList = vesselSchedule.details;
      this.getTranistData();

    }
    else {

      

  
      this.TransitListForm.get('items').clear();

      this.TransitList =[];
      this.getTranistData();
      this.editVesselScheduleForm.patchValue({
        vesselName: '',
        voyageNo: '',
        destinationCity: "",
        originTerminal: '',
        estArrOriDate: new Date().toISOString().split('T')[0],
        estBerthDate: new Date().toISOString().split('T')[0],
        estGateOpenDate: new Date().toISOString().split('T')[0],
        estCutOffDate: new Date().toISOString().split('T')[0],
        estDepDate: new Date().toISOString().split('T')[0],
        destinationTerminal: '',
        estArrDestDate: new Date().toISOString().split('T')[0],
        originPortId: "",
        destinationPortId: "",
        id: 0,
        originCity: "",
        isActive: true,
        createdBy: '',
        updatedBy: '',
      });



    }


  }
  submitTransitDetails() {
    console.log(this.TransitListForm.value.items);
  }

  addTransit() {
    this.TransitListForm.get('items').push(new FormGroup({

      id: new FormControl(0, [Validators.required]),
      scheduleId: new FormControl(0, [Validators.required]),
      transitPortId: new FormControl("", [Validators.required]),
      transitTerminal: new FormControl(''),
      expArrival: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
      expDeparture: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
      isLoadingAvailable: new FormControl(false, [Validators.required]),
      isDeliveryAvailable: new FormControl(false, [Validators.required]),
      transitRouteNo: new FormControl(''),
      isActive: new FormControl(true, [Validators.required]),
      createdBy: new FormControl(''),
      updatedBy: new FormControl(''),
      createdAt: new FormControl(''),
      updatedAt: new FormControl(''),

    }));

  }
  track(item: any, index: number) {
    return index;
  }

  deleteTransitItem(i: number) {
    this.TransitListForm.get('items').removeAt(i);
  }
  getExistingTransitData() {
    console.log(this.TransitList);
    return this.TransitList;
  }
  getTranistData() {

    if (this.TransitList.length > 0 && this.TransitListForm != undefined) {

      if (this.TransitListForm.get('items').length > 0) {
        for (let x in this.TransitListForm.get('items')) {
          this.TransitListForm.get('items').removeAt(x);
        }
      }
      let dat = this.getExistingTransitData();
      if (dat.length > 0) {
        for (let x in dat) {
          this.TransitListForm.get('items').push(new FormGroup({

            id: new FormControl(dat[x].id, [Validators.required]),
            scheduleId: new FormControl(dat[x].scheduleId, [Validators.required]),
            transitPortId: new FormControl(dat[x].transitPortId, [Validators.required]),
            transitTerminal: new FormControl(dat[x].transitTerminal),
            expArrival: new FormControl(this.formatDate(dat[x].expArrival), [Validators.required]),
            expDeparture: new FormControl(this.formatDate(dat[x].expDeparture), [Validators.required]),
            isLoadingAvailable: new FormControl(dat[x].isLoadingAvailable, [Validators.required]),
            isDeliveryAvailable: new FormControl(dat[x].isDeliveryAvailable, [Validators.required]),
            transitRouteNo: new FormControl(dat[x].transitRouteNo),
            createdBy: new FormControl(dat[x].createdBy ),
            updatedBy: new FormControl(dat[x].updatedBy ),
            createdAt: new FormControl(dat[x].createdAt ),
            updatedAt: new FormControl(dat[x].updatedAt),
            isActive: new FormControl(dat[x].isActive),


          }))
        }
      }
    }
  }
  saveData()
  {
    let x = {
      id: this.editVesselScheduleForm.value.id,

      isActive: false,
      createdBy: this.editVesselScheduleForm.value.createdBy,
      updatedBy: this.editVesselScheduleForm.value.updatedBy,
      createdAt: this.editVesselScheduleForm.value.createdAt,
      updatedAt: this.editVesselScheduleForm.value.updatedAt,
      vesselName: this.editVesselScheduleForm.value.vesselName,
      voyageNo: this.editVesselScheduleForm.value.voyageNo,
      originTerminal: this.editVesselScheduleForm.value.originTerminal,
      estArrOriDate: this.editVesselScheduleForm.value.estArrOriDate,
      estBerthDate: this.editVesselScheduleForm.value.estBerthDate,
      estGateOpenDate: this.editVesselScheduleForm.value.estGateOpenDate,
      estCutOffDate: this.editVesselScheduleForm.value.estCutOffDate,
      estDepDate: this.editVesselScheduleForm.value.estDepDate,
      destinationTerminal: this.editVesselScheduleForm.value.destinationTerminal,
      estArrDestDate: this.editVesselScheduleForm.value.estArrDestDate,
      originPortId: parseInt(this.editVesselScheduleForm.value.originPortId),
      destinationPortId: parseInt(this.editVesselScheduleForm.value.destinationPortId),
      details: this.TransitListForm.value.items
    }
    console.log(x);
    //TODO: onsuccess : Refresh the data
    this.apiClient.postMethod(x, 'VesselSchedules').toPromise().then((data => { console.log(data); })).catch((err => { console.log(err); }))
    // this.vslSchedule.vesselName : this.editVesselScheduleForm.value['vesselName'];
    this.modalService.dismissAll();

  }


  delete(e,index) {


    if (e > 0) {
      this.apiClient.Delete<any>('VesselSchedules', e).toPromise().then((data) => {
        this.vesselScheduleList.splice(index, 1);
      }).catch((error) => {
      console.log(JSON.stringify(error))

      });
    }
 
  }



  onSubmit() {

    //controls. get('vesselName').

    console.log(this.TransitListForm.value.items);
    if (this.editVesselScheduleForm.invalid ||  this.TransitListForm.invalid)
    {
      console.log(this.TransitListForm.value.items);
      return false;
    }
    else

    {

    let x = {
      id: this.editVesselScheduleForm.value.id,

      isActive: true,
      createdBy: this.editVesselScheduleForm.value.createdBy,
      updatedBy: this.editVesselScheduleForm.value.updatedBy,
      createdAt: this.editVesselScheduleForm.value.createdAt,
      updatedAt: this.editVesselScheduleForm.value.updatedAt,
      vesselName: this.editVesselScheduleForm.value.vesselName,
      voyageNo: this.editVesselScheduleForm.value.voyageNo,
      originTerminal: this.editVesselScheduleForm.value.originTerminal,
      estArrOriDate: this.editVesselScheduleForm.value.estArrOriDate,
      estBerthDate: this.editVesselScheduleForm.value.estBerthDate,
      estGateOpenDate: this.editVesselScheduleForm.value.estGateOpenDate,
      estCutOffDate: this.editVesselScheduleForm.value.estCutOffDate,
      estDepDate: this.editVesselScheduleForm.value.estDepDate,
      destinationTerminal: this.editVesselScheduleForm.value.destinationTerminal,
      estArrDestDate: this.editVesselScheduleForm.value.estArrDestDate,
      originPortId: parseInt(this.editVesselScheduleForm.value.originPortId),
      destinationPortId: parseInt(this.editVesselScheduleForm.value.destinationPortId),
      details: this.TransitListForm.value.items
    }
  
    //TODO: onsuccess : Refresh the data
    this.apiClient.postMethod<VesselHeader>(x, 'VesselSchedules').toPromise().then((data => { 
     

      if (data.id == x.id){


        this.vesselScheduleList = this.vesselScheduleList.map(u => u.id !== data.id ? u : data);
        // const catIndex = this.vesselScheduleList.findIndex(exCat => data.id === x.id);
        // console.log(catIndex);
        // const catTmp = this.vesselScheduleList[catIndex]         
        // this.vesselScheduleList[catIndex]= {...data};          
      
        console.log('modified');

      }
      else{
        this.vesselScheduleList.push(data);  
                      }
 


 
     })).catch((err => { console.log(err); }))
    // this.vslSchedule.vesselName : this.editVesselScheduleForm.value['vesselName'];
    }
    this.modalService.dismissAll();
  }


}
