import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { ApiClientService } from '../../services/api-client.service';
import { Partner } from '../../models/partner';
import { ModelMapper } from '../../utils/model-mapper';
@Component({
  selector: 'app-partner-main',
  templateUrl: './partner-main.component.html',
  styleUrls: ['./partner-main.component.css'],
})
export class PartnerMainComponent implements OnInit {
  partnersSub = new Subject<any[]>();
  hideBE: true;
  title = 'Add';
  editPartnerForm: FormGroup;
  partnerList: Partner[];
  partnerEntry: Partner;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiClient: ApiClientService
  ) {}
  ngOnInit() {
    this.apiClient.get('Partner').subscribe((res) => {
      this.partnerList = res;
      this.partnersSub.next(this.partnerList.slice());
    });

    this.editPartnerForm = this.fb.group({
      id: 0,
      isActive: new FormControl(false, [Validators.required]),
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],
      partnerName: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: [''],
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      partnerTypeId: 0,

      email1: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),

      email2: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),

      phone1: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      phone2: new FormControl(null, [Validators.pattern('[0-9]{0,10}')]),

      contact1: new FormControl(null, [Validators.required]),
      contact2: [''],
    });
  }
  openModal(targetModal, partner) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });

    if (partner != null) {
      this.title = 'Edit';
      this.editPartnerForm.patchValue({
        id: partner.id,
        isActive: partner.isActive,
        createdBy: partner.createdBy,
        updatedBy: partner.updatedBy,
        createdAt: partner.createdAt,
        updatedAt: partner.updatedAt,
        partnerName: partner.partnerName,
        address1: partner.address1,
        address2: partner.address2,
        city: partner.city,
        zipCode: partner.zipCode,
        partnerTypeId: partner.partnerTypeId,
        email1: partner.email1,
        email2: partner.email2,
        phone1: partner.phone1,
        phone2: partner.phone2,
        contact1: partner.contact1,
        contact2: partner.contact2,
      });
    } else {
      this.title = 'Add';
      this.editPartnerForm.patchValue({
        id: 0,
        isActive: false,
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: '',
        partnerName: '',
        address1: '',
        address2: '',
        city: '',
        zipCode: '',
        partnerTypeId: 0,
        email1: '',
        email2: '',
        phone1: '',
        phone2: '',
        contact1: '',
        contact2: '',
      });
    }
  }
  onSubmit() {
    this.modalService.dismissAll();

    var partnerId = this.editPartnerForm.getRawValue()['id'];
    this.apiClient
      .postMethod(this.editPartnerForm.value, 'Partner')
      .toPromise()
      .then((data) => {
     
        this.partnerEntry = new ModelMapper(Partner).map(data);

        if (this.partnerEntry.id == partnerId) {
          const catIndex = this.partnerList.findIndex(
            (exCat) => this.partnerEntry.id === exCat.id
          );
          const catTmp = this.partnerList[catIndex];
          this.partnerList[catIndex] = this.partnerEntry;
          // this.vesschargesSub.next(this.vesscharges.slice());
          console.log('modified');
        } else {
          console.log('added');

          this.partnerList.push(this.partnerEntry);

          //this.currenciesSub.next(this.currencies.slice());
          console.log('added');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
