import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-air',
  templateUrl: './air.component.html',
  styleUrls: ['./air.component.css']
})
export class AirComponent implements OnInit {

  airFrm: FormGroup;
  schedules: any[];
  quotes: any[];
  cities: any[];
  citySub: Subscription;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {}

}
