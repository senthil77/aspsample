import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-of-landing',
  templateUrl: './bill-of-landing.component.html',
  styleUrls: ['./bill-of-landing.component.css']
})
export class BillOfLandingComponent implements OnInit {

  editBolForm: FormGroup;
  constructor(private fb: FormBuilder,) { }
  onSubmit()
  {
    console.log(this.editBolForm.getRawValue());

  }
  ngOnInit(): void {

    this.editBolForm = this.fb.group({
      shipperName: ['', Validators.required],
      shipperAddress1: ['',Validators.required],
      shipperAddress2: [''],
      shipperCity: ['',Validators.required],
      shipperZipCode: ['',Validators.required],
      shipperEmail: [''],
      shipperPhone: [''],
      shipperCountry: [''],
      shipperIecCode: [''],
      shipperPanNo: ['',Validators.required],
      shipperId: [''],
      shipperIsActive: [''],
      shipperCreatedBy: [''],
      shipperUpdatedBy: [''],
      shipperCreatedAt: [''],
      shipperUpdatedAt: [''],

      consigneeName: [''],
      consigneeAddress1: [''],
      consigneeAddress2: [''],
      consigneeCity: [''],
      consigneeZipCode: [''],
      consigneeEmail: [''],
      consigneePhone: [''],
      consigneeCountry: [''],
      consigneeIecCode: [''],
      consigneePanNo: [''],
      consigneeId: [''],
      consigneeIsActive: [''],
      consigneeCreatedBy: [''],
      consigneeUpdatedBy: [''],
      consigneeCreatedAt: [''],
      consigneeUpdatedAt: [''],
      notifyName: [''],
      notifyAddress1: [''],
      notifyAddress2: [''],
      notifyCity: [''],
      notifyZipCode: [''],
      notifyEmail: [''],
      notifyPhone: [''],
      notifyCountry: [''],
      notifyIecCode: [''],
      notifyPanNo: [''],
      notifyId: [''],
      notifyIsActive: [''],
      notifyCreatedBy: [''],
      notifyUpdatedBy: [''],
      notifyCreatedAt: [''],
      notifyUpdatedAt: [''],

      noOfOriginalBill:[''],
      termsofShipment:[''],
      frieghtPayableAt:[''],
      cargo:[''],
      grossWeight:[''],
      netWeight:[''],
      cargoDescription:['']
      
       });
      
  }

}
