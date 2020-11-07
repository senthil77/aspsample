import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../models/currency';
import { ModelMapper } from '../../utils/model-mapper';
import { Subscription } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client.service';
import { StoreService } from 'src/app/utils/store-service';

@Component({
  selector: 'app-currency-main',
  templateUrl: './currency-main.component.html',
  styleUrls: ['./currency-main.component.css']
})
export class CurrencyMainComponent implements OnInit {
  title = 'Add';
  editCurrencyForm: FormGroup;
  currencyList: Currency[];

  isSubmitted = false;
  currencySub: Subscription;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private service: StoreService) { }
  ngOnInit() {

    this.currencySub = this.service.activeCurrencies$.subscribe((data) => {
      this.currencyList = data;
    });
    this.editCurrencyForm = this.fb.group({
      currencyCode: ['', Validators.required],
      description: ['', Validators.required],
      id: 0,
      isActive: [false, Validators.required],
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }
  openModal(targetModal, currency) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (currency != null) {
      this.title='Edit';
      this.editCurrencyForm.patchValue({
        currencyCode: currency.currencyCode,
        description: currency.description,
        id: currency.id,
        isActive: currency.isActive,
        createdBy: currency.createdBy,
        updatedBy: currency.updatedBy,
        createdAt: currency.createdAt,
        updatedAt: currency.updatedAt,
      });
    }
    else {
      this.title='Add';
      this.editCurrencyForm.patchValue({
        currencyCode: '',
        description: '',
        id: 0,
        isActive: false,
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: '',
      });
    }
  }
  get currencyFormControl() { return this.editCurrencyForm.controls; }

  delete(e, index) {


    this.service.drop(e, 'Currency');

  }
  onSubmit() {

    this.isSubmitted = true;
    if (!this.editCurrencyForm.valid) {
      return false;
    } else {

      this.service.addCurrency(this.editCurrencyForm.value);
      this.currencySub = this.service.activeCurrencies$.subscribe((data) => {
        this.currencyList = data;
      });
      this.modalService.dismissAll();
    }


  }
}
