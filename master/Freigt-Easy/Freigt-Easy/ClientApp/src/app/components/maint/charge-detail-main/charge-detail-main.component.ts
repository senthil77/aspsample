import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelMapper } from '../../../utils/model-mapper';
import { ApiClientService } from 'src/app/services/api-client.service';
import { ChargeDetail } from '../../../models/charge-detail';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/utils/store-service';
import { NotificationService } from 'src/app/services/notification.service';
import { AutoPagerService } from 'src/app/services/auto-pager.service'
@Component({
  selector: 'app-charge-detail-main',
  templateUrl: './charge-detail-main.component.html',
  styleUrls: ['./charge-detail-main.component.css'],
})
export class ChargeDetailMainComponent implements OnInit {
  title = 'Add';
  editChargeDetailForm: FormGroup;
  chargeDetailList: ChargeDetail[] = [];
  chargeDetailEntry: ChargeDetail;
  chargedAt: any[];
  chargedAtSub: Subscription;
  pager: any = {};
  pageSize= 5;
  pagedItems: any[];
  overAllSize= 0; 
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiClientService: ApiClientService,
    private store: StoreService,
    private notify: NotificationService,
    private pagerService:AutoPagerService,
  ) {}
  setPage(page: number, firsttime: boolean) {
    // get pager object from service

    this.pager = this.pagerService.getPager(this.overAllSize, page, this.pageSize);

     

    if (firsttime) {

      this.pagedItems = this.chargeDetailList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
    } else {

        
        this.pagedItems = this.chargeDetailList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    // get current page of items

}
  ngOnInit() {
    this.apiClientService.get('ChargeDetail').subscribe((data) => {
      this.chargeDetailList = data;
      this.overAllSize = this.chargeDetailList.length;
      this.setPage(1, true);
    });

    this.chargedAtSub = this.store.chargedAt$.subscribe((chargedAT) => {
      this.chargedAt = chargedAT;
    });

    this.editChargeDetailForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),

      chargedAtId: new FormControl('', [Validators.required]),
      id: 0,
      isActive: new FormControl(false, [Validators.required]),
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }
  openModal(targetModal, chargeDetail) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    if (chargeDetail != null) {
      this.title = 'Edit';
      this.editChargeDetailForm.patchValue({
        name: chargeDetail.name,

        id: chargeDetail.id,
        chargedAtId: chargeDetail.chargedAtId,
        isActive: chargeDetail.isActive,
        createdBy: chargeDetail.createdBy,
        updatedBy: chargeDetail.updatedBy,
        createdAt: chargeDetail.createdAt,
        updatedAt: chargeDetail.updatedAt,
      });
    } else {
      this.title = 'Add';
      this.editChargeDetailForm.patchValue({
        name: '',

        chargedAtId: '',
        id: 0,
        isActive: false,
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: '',
      });
    }
  }

  onSubmit() {
    this.modalService.dismissAll();

    var chargeDetailId = this.editChargeDetailForm.getRawValue()['id'];

    this.apiClientService
      .postMethod<ChargeDetail>(this.editChargeDetailForm.value, 'ChargeDetail')
      .toPromise()
      .then((data) => {

        console.log(data);
        if (data.id == chargeDetailId) {

          console.log(data);
          this.chargeDetailList = this.chargeDetailList.map((u) =>
            u.id !== data.id ? u : data
          );
          this.notify.showSuccess('Modified Charge Detail');
        } else {

          console.log(data + 'super');
           this.chargeDetailList.push(data);
           this.notify.showSuccess('Added Charge Detail');
        }
      })
      .catch((err) => {
        this.notify.showError(JSON.stringify(err));
      });
  }
}
