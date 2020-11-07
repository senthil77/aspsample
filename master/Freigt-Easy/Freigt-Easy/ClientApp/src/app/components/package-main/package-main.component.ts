import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { StoreService } from '../../utils/store-service';
 
import {Package} from '../../models/package';
@Component({
  selector: 'app-package-main',
  templateUrl: './package-main.component.html',
  styleUrls: ['./package-main.component.css']
})
export class PackageMainComponent implements OnInit {
  isSubmitted = false;
  title = 'modal2';
 editPackageForm: FormGroup;
 packageList:Package[];
 packageSub:Subscription;
 constructor(private fb: FormBuilder, private modalService: NgbModal, private service: StoreService) {}
 ngOnInit() {
  this.editPackageForm = this.fb.group({
packageName: ['',Validators.required],

description: ['', Validators.required ],
id: 0,
isActive: [false, Validators.required ],
createdBy: [''],
updatedBy: [''],
createdAt: [''],
updatedAt: [''],
 });
   

  // this.packageList = this.apiService.packageTypes;

   
    this.packageSub = this.service.activePackages$.subscribe((packData) => {
      this.packageList = packData;
    });
  

 }

 isSwitchedOn = true;

 onChange($event) {
   console.log('onChange', $event);
 }
 onChangeEvent($event) {
   console.log('onChangeEvent', $event);
 }
 onValueChange($event) {
   console.log('onValueChange', $event);
 }
 get packageFormControl() { return this.editPackageForm.controls; }  
 openModal(targetModal, pack) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
  });
 if (pack==null)
 {
   this.title="Add";
  this.editPackageForm.patchValue({
    packageName:'',
    description:'',
    id:0,
    isActive:false,
    createdBy:'',
    updatedBy:'',
    createdAt:'',
    updatedAt:'',
      });
 }
 else{
   this.title= "Edit";
      this.editPackageForm.patchValue({
          packageName:pack.packageName,
          description:pack.description,
          id:pack.id,
          isActive:pack.isActive,
          createdBy:pack.createdBy,
          updatedBy:pack.updatedBy,
          createdAt:pack.createdAt ,
          updatedAt:pack.updatedAt,
            });
    }
 }

 delete(e,index) {


 this.service.drop(e,'Package');

}

 onSubmit() {
 

  this.isSubmitted = true;
  if (!this.editPackageForm.valid) {
    return false;
  } else {

    this.service.addPackage(this.editPackageForm.value);
 
  
     
     this.packageSub = this.service.activePackages$.subscribe((packData) => {
       this.packageList = packData;
     });

  }

    this.modalService.dismissAll();
  
 

 }

}
