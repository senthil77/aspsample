import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import {VesselHeader} from '../../models/vessel-header';
@Component({
  selector: 'app-search-schedule-list',
  templateUrl: './search-schedule-list.component.html',
  styleUrls: ['./search-schedule-list.component.css']
})
export class SearchScheduleListComponent implements OnInit {
 
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
calculateDiff(sentDate,sentDate2) {
  var date1:any = new Date(sentDate2);
  var date2:any = new Date(sentDate);
  var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
 
  return diffDays;
 }
  constructor(private utils:HelperService) { }


  getVesselSchedule(item:VesselHeader)
  {

    
    var stDate: any;
    var enDate:any;
 
    if (item.originPort.portCode == this.searchItem.originCity)
    {
      
      stDate= item.estDepDate;
    }
    else
    {
      var filtered = item.details.filter(x=>x.transitPort.portCode == this.searchItem.originCity);
      if (filtered!=null && filtered.length>0)
      {
        stDate=filtered[0].expDeparture;
      }
      
    }

    if (item.destinationPort.portCode == this.searchItem.destinationCity)
    {
      enDate= item.estArrDestDate;
    }
    else
    {
      var filtered = item.details.filter(x=>x.transitPort.portCode == this.searchItem.destinationCity);
      if (filtered!=null && filtered.length>0)
      {
        enDate=filtered[0].expArrival;
      }
      
    }
    var transi= this.utils.getTransits(item, enDate);
    let newRet={
      startDate:stDate,
      enDate:enDate,
      transits:transi.tranMessage,
      transPorts:transi.tranPorts,
      noOfDays: this.calculateDiff(enDate,stDate)
    }
  
    return newRet;
  }


  ngOnInit() {

 
  }

}
