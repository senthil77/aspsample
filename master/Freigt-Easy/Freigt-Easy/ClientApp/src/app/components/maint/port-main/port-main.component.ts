import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
 
import {Port} from '../../../models/port';
import { StoreService } from '../../../utils/store-service';

@Component({
  selector: 'app-port-main',
  templateUrl: './port-main.component.html',
  styleUrls: ['./port-main.component.css']
})
export class PortMainComponent implements OnInit {

  isSubmitted = false;
  title = 'Add';
  editPortForm: FormGroup;
  portList:Port[];
  portSub:Subscription;
  constructor(private fb: FormBuilder, private modalService: NgbModal,private portService:StoreService) {}
  ngOnInit() {
        this.editPortForm = this.fb.group({
      id: 0,
      isActive: false,
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],
      portCode: ['', Validators.required ],
      cityCode: ['', Validators.required ],
      countryCode:['', Validators.required ],
      cityDescription:['', Validators.required ],
      portDescription:['', Validators.required ],
      longDescription: ['', Validators.required ],
      countryDescription:['', Validators.required ],
        });

 

   
    this.portSub = this.portService.ports$.subscribe((portData) => {
      this.portList = portData;
    });
  
 
  }
  openModal(targetModal,port) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static'
   });
  
    if (port!=null)
    {   
      this.title ="Edit";
        this.editPortForm.patchValue({
            id:port.id,
            isActive:port.isActive,
            createdBy:port.createdBy,
            updatedBy:port.updatedBy,
            createdAt:port.createdAt,
            updatedAt:port.updatedAt,
            portCode:port.portCode,
            cityCode:port.cityCode,
            countryCode:port.countryCode,
            cityDescription:port.cityDescription,
            portDescription:port.portDescription,
            longDescription:port.longDescription,
            countryDescription:port.countryDescription,
      });
    }
    else 
    {
      this.title ="Add";
      this.editPortForm.patchValue({
        id:0,
        isActive:false,
        createdBy:'',
        updatedBy:'',
        createdAt:'',
        updatedAt:'',
        portCode:'',
        cityCode:'',
        countryCode:'',
        cityDescription:'',
        portDescription:'',
        longDescription:'',
        countryDescription:'',
      });
    }
  }

  delete(e,index) {


    this.portService.drop(e,'Port');
   
   }
  onSubmit() {
  
    
  this.isSubmitted = true;
  if (!this.editPortForm.valid) {
    return false;
  } else {
    this.portService.addPort(this.editPortForm.value);  
  this.portSub = this.portService.ports$.subscribe((portData) => {
    this.portList = portData;
  });


  this.modalService.dismissAll();
  }

 
  
  }
}
