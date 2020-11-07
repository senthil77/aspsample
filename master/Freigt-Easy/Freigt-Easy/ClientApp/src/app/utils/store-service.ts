import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { ApiClientService } from '../services/api-client.service';
import { Port } from '../models/port';
import { Package } from '../models/package';
import { Currency } from '../models/currency';
import { ChargedAt } from '../models/quote-trip-charge-detail';
import { UserRole } from '../models/user';

//currency/port/package
@Injectable({ providedIn: 'root' })
export class StoreService {



  private readonly _userRoles = new BehaviorSubject<UserRole[]>([]);
  readonly userRoles$ = this._userRoles.asObservable();


  private readonly _partnerId = new BehaviorSubject<string>('');
  readonly _partnerId$ = this._partnerId.asObservable();




  private readonly _ports = new BehaviorSubject<Port[]>([]);
  readonly ports$ = this._ports.asObservable();

  private readonly _packages = new BehaviorSubject<Package[]>([]);
  private packages$ = this._packages.asObservable();


  private readonly _currencies = new BehaviorSubject<Currency[]>([]);
  private _currencies$ = this._currencies.asObservable();

  private readonly _chargedAt = new BehaviorSubject<ChargedAt[]>([]);

  readonly chargedAt$ = this._chargedAt.asObservable();

  constructor(private apiservice: ApiClientService) {
    this.fetchPorts();
    this.fetchPackages();
    this.fetchCurrencies();
    this.fetchChargeAt();
    this.fetchUserRoles();
    this.fetchTempPartnerID();


  }



   

  async fetchTempPartnerID()
  {
    this.apiservice.getScalar('Partner', 'GetTempPartnerId').toPromise().then((data)=>{
      this.partnerID =data
      this._partnerId.next(this.partnerID);
    })

  }
  async fetchUserRoles() {
    let data: {
      code: true
    }

    //http://localhost:64320/api/utility/getAllRoles
    await this.apiservice.get <UserRole>('Utility').toPromise().then((data) => {

      this.userRoles = data;
      console.log(this.userRoles);
      this._userRoles.next(this.userRoles.slice());


    })

  }
  async fetchPorts() {
    await this.apiservice.get('Port').toPromise().then((data) => {

      this.ports = data;
      this._ports.next(this.ports.slice());


    })
  }


  async fetchPackages() {
    await this.apiservice.get('Package').toPromise().then((data) => {

      this.packages = data;
      this._packages.next(this.packages.slice());

    })
  }

  async fetchCurrencies() {
    await this.apiservice.get('Currency').toPromise().then((data) => {

      this.currencies = data;
      this._currencies.next(this.currencies.slice());

    })
  }

  async fetchChargeAt() {
    await this.apiservice.get('Utility').toPromise().then((data) => {

      this.chargedAt = data;
      this._chargedAt.next(this.chargedAt.slice());


    })
  }

  get partnerID():any{
    return this._partnerId.getValue();
  }

  set partnerID(val: any)
  {
      this._partnerId.next(val);
  }
  get chargedAt(): any[] {
    return this._chargedAt.getValue();
  }

  set chargedAt(val: any[]) {
    this._chargedAt.next(val);
  }
  get ports(): Port[] {
    return this._ports.getValue();
  }

  set ports(val: Port[]) {
    this._ports.next(val);
  }


  get packages(): Package[] {
    return this._packages.getValue();
  }

  set packages(val: Package[]) {
    this._packages.next(val);
  }

  get currencies(): Currency[] {
    return this._currencies.getValue();
  }

  set currencies(val: Currency[]) {
    this._currencies.next(val);
  }



  get userRoles(): UserRole[] {
    return this._userRoles.getValue();
  }

  set userRoles(val: UserRole[]) {
    this._userRoles.next(val);
  }



  //data.map(obj => ({ value: obj.cityCode, label: obj.cityDescription }));
  readonly tempRole$ = this.userRoles$.pipe(map(urole => urole.filter(tempRole => tempRole.roleName == 'TEMP')))


  readonly activeRoles$ = this.userRoles$.pipe(
    map(uRoles => uRoles.filter(uRole => uRole.roleName !== 'ADMIN'))
  )


  readonly activePorts$ = this.ports$.pipe(
    map(ports => ports.filter(port => port.isActive))
  )

  readonly inActivePorts$ = this.ports$.pipe(
    map(ports => ports.filter(port => !port.isActive))
  )


  readonly activePackages$ = this.packages$.pipe(
    map(packages => packages.filter(pack => pack.isActive))
  )

  readonly inActivePackages$ = this.ports$.pipe(
    map(packages => packages.filter(pack => !pack.isActive))
  )


  readonly activeCurrencies$ = this._currencies$.pipe(
    map(currencies => currencies.filter(currency => currency.isActive))
  )

  readonly inActiveCurrencies$ = this._currencies$.pipe(
    map(currencies => currencies.filter(currency => !currency.isActive))
  )



  async addPort(newPort: Port) {
    try {
      const todo = await this.apiservice.postMethod<Port>(newPort, 'Port')
        .toPromise();

      if (todo != null) {
        if (newPort.id == todo.id) {
          const catIndex = this.ports.findIndex(exCat => todo.id === exCat.id);
          const catTmp = this.ports[catIndex]
          this.ports[catIndex] = { ...todo };

          console.log('modified');

        }
        else {
          this.ports.push(todo);
        }

      }



      // const tmpId = 1;
      // we swap the local tmp record with the record from the server (id must be updated)
      //const index = this.ports.indexOf(this.ports.find(t => t.id === tmpId));
      //this.ports[index] = {
      //   ...todo
      // }
      this.ports = [...this.ports];
      this._ports.next(this.ports.slice());

    } catch (e) {
      // is server sends back an error, we revert the changes
      console.error(e);
      // this.removeTodo(tmpId, false);
    }


  }

  async addPackage(newPackage: Package) {
    try {
      const pack = await this.apiservice.postMethod<Package>(newPackage, 'Package')
        .toPromise();

      if (pack != null) {
        if (newPackage.id == pack.id) {
          const catIndex = this.packages.findIndex(exCat => pack.id === exCat.id);
          const catTmp = this.packages[catIndex];
          this.packages[catIndex] = { ...pack };

          console.log('modified');

        }
        else {
          this.packages.push(pack);
        }

      }



      // const tmpId = 1;
      // we swap the local tmp record with the record from the server (id must be updated)
      //const index = this.ports.indexOf(this.ports.find(t => t.id === tmpId));
      //this.ports[index] = {
      //   ...todo
      // }
      this.packages = [...this.packages];
      this._packages.next(this.packages.slice());
    } catch (e) {
      // is server sends back an error, we revert the changes
      console.error(e);
      // this.removeTodo(tmpId, false);
    }


  }

  async addCurrency(newCurrency: Currency) {
    try {
      const currency = await this.apiservice.postMethod<Currency>(newCurrency, 'Currency')
        .toPromise();

      if (currency != null) {
        if (newCurrency.id == currency.id) {
          const catIndex = this.currencies.findIndex(exCat => currency.id === exCat.id);
          const catTmp = this.currencies[catIndex];
          this.currencies[catIndex] = { ...currency };

          console.log('modified');

        }
        else {
          this.currencies.push(currency);
        }

      }



      this.currencies = [...this.currencies];
      this._currencies.next(this.currencies.slice());
    } catch (e) {
      // is server sends back an error, we revert the changes
      console.error(e);
      // this.removeTodo(tmpId, false);
    }


  }

  removeandRefesh(url:string,catIndex:number)
  {

    switch (url) {
      case 'Package': {
       
  
        this.packages.splice(catIndex, 1);

          this.packages = [...this.packages];
          this._packages.next(this.packages.slice());
     
        break;
      }
      case 'Currency': {

        this.currencies.splice(catIndex, 1);

        this.currencies = [...this.currencies];
        this._currencies.next(this.currencies.slice());
      }
      
      case 'Port': {

        this.ports.splice(catIndex, 1);

        this.ports = [...this.ports];
        this._ports.next(this.ports.slice());
      }
    
   }
  
  }
  async drop(id:number, url:string)
  {

    try {
      await this.apiservice.Delete<any>(url, id)
        .toPromise().then((data) => 
        {
          const catIndex = this.packages.findIndex(exCat => id === exCat.id);

          this.removeandRefesh(url,catIndex);
          
        }).catch((err) =>
        {}
        );

    




    } catch (e) {
      // is server sends back an error, we revert the changes
      console.error(e);
      // this.removeTodo(tmpId, false);
    }
  }
}
