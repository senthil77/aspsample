import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  @Input() item: any;
  @Input() searchItem: any;
  private _data = new BehaviorSubject<any[]>([]);
// change data to use getter and setter
@Input()
set data(value) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
};

get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
}
  constructor(public utils:HelperService) { }

  ngOnInit(): void {
 
  }
 
  getTransits(itemData)
  {

    return this.utils.getTransits(itemData.vesselSchedule,itemData.endDate);
    
  
  }

}
