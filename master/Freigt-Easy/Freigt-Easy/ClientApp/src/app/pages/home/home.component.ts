import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Port } from 'src/app/models/port';
 
import { StoreService } from 'src/app/utils/store-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  originPorts:  Port[];
  allCities:any[];
   oriCities: any[];
  destCities: any[];
  packages:any[];
  packagesSub:Subscription;
  originPortsSub:Subscription;
 pack:any[];

  constructor(private store:StoreService)
  {
    this.originPortsSub = this.store.activePorts$.subscribe((portData) => {
      this.originPorts = portData;
      if (this.originPorts.length>0)
      {
            this.allCities= this.originPorts.filter(port => port.isActive).            
       map(port => ({ value:port.cityCode, name :port.portDescription}));
   
       this.oriCities= this.allCities;
       this.destCities= this.allCities;
       
 
  

       
      }

    });
    this.packagesSub = this.store.activePackages$.subscribe((pckData)=>{
      this.packages= pckData;
      if (this.packages.length>0)
      {
      this.pack= pckData.filter(packData => packData.id>0).            
      map(packData => ({ value:packData.id, name :packData.packageName})); 
      console.log(this.pack)   ;
    }

   });

   
 
  }

  ngOnInit(): void {

 

 
}

selectpackagesEvent(e)
{
  console.log(e);

}

keyword='name';
 
 

  selectoriCitiesEvent(item) {
    // do something with selected item
    
    this.destCities = this.allCities.filter((it)=> it.value !==item.value);
  

  }

  selectdestCitiesEvent(item) {
    // do something with selected item
 
    this.oriCities = this.allCities.filter((it)=> it.value !==item.value);
    
  }

  onChangeSearch(val: string) {

  }
  resetOrigin(e)
  {
  

    this.destCities = this.allCities;
  }

  resetDest(e)
  {
   

    this.oriCities = this.allCities;
  }
  onFocused(e){
    // do something when input is focused
    
  }

}
