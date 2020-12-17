import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from '../models/user';
import { StoreService } from '../utils/store-service';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private store:StoreService, private dp: DatePipe) { 

     
  }
  
 
   inFuture = (date: Date) => {
   
    return date > new Date(new Date().setDate(new Date().getDate()))
};


  formatDate(dtValue: Date) {
    //return new Date(dtValue).toISOString().slice(0,10);
    let myDate = dtValue.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    return this.dp.transform(myDate, 'yyyy-MM-dd', 'es-ES');




  }

  getCurrentDate() {
    const date = new Date();
return  date.toLocaleDateString('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric'
}).replace(/ /g, '-');



  }
  calculateTotal(charges:any[])
  {
    return charges.reduce((sum, current) => sum + current, 0);
  }
  calculateDiff(sentDate,sentDate2) {
    var date1:any = new Date(sentDate2);
    var date2:any = new Date(sentDate);
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
   
    return diffDays;
   }

   
  getTransits(itemData:any, enDate:any)
  {
    var result ='No Transits';
    var ports='';
    if(itemData.details!= null &&  itemData.details.length>0)
    {
      var res= itemData.details.filter(x=> new Date(x.expArrival)<new Date(enDate));
    if (res!=null && res.length>0)
    {
      ports= res.map(obj => obj.transitPort.cityDescription).join();
   
      result= res.length + "- Transit(s)";
    }
 
    }
 
    return  {tranMessage:result,tranPorts: ports }
  
  }
  pick = (...props) => o => props.reduce((a, e) => ({ ...a, [e]: o[e] }), {});

   confirmPassword(control: FormControl, group: FormGroup, matchPassword: string) {
    if (!control.value || group.controls[matchPassword].value !== null || group.controls[matchPassword].value === control.value) {
        return null;
    }
    return { 'mismatch': true }
}
}


