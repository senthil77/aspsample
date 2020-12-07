import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelMapper } from '../../utils/model-mapper';
import { ApiClientService } from 'src/app/services/api-client.service';
import { ChargeDetail } from '../../models/charge-detail';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/utils/store-service';
import { NotificationService } from 'src/app/services/notification.service';
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
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiClientService: ApiClientService,
    private store: StoreService,
    private notify: NotificationService
  ) {}
  ngOnInit() {
    this.apiClientService.get('ChargeDetail').subscribe((data) => {
      this.chargeDetailList = data;
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
        if (data.id == chargeDetailId) {
          this.chargeDetailList = this.chargeDetailList.map((u) =>
            u.id !== data.id ? u : data
          );
          this.notify.showSuccess('Modified Charge Detail');
        } else {
          this.chargeDetailList.push(this.chargeDetailEntry);
          this.notify.showSuccess('Added Charge Detail');
        }
      })
      .catch((err) => {
        this.notify.showError(JSON.stringify(err));
      });
  }
}
