import { Component, OnInit } from '@angular/core';



import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators'
import { ApiClientService } from 'src/app/services/api-client.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-detailed-fares',
  templateUrl: './detailed-fares.component.html',
  styleUrls: ['./detailed-fares.component.css']
})
export class DetailedFaresComponent implements OnInit {
  public state$: Observable<string>;
  itemData: any
  searchParams: any;
  originSummary: [];
  destinationSummary: [];
  transi: any;
  blFee = 'BL fee';
  constructor(private apiService: ApiClientService, private router: Router, private utils: HelperService) {

    //console.log(this.router.getCurrentNavigation().extras.state.example); // should log out 'bar'
    if (this.router.getCurrentNavigation().extras.state != null) {

      var allData = this.router.getCurrentNavigation().extras.state.example;

      this.itemData = allData.resultData;
      this.searchParams = allData.searchData;



      this.originSummary = this.itemData.charges.chargeDetails.filter(x => x.chargeDetail.chargedAt.name == 'ORIGIN' && x.isActive == true);
      this.destinationSummary = this.itemData.charges.chargeDetails.filter(x => x.chargeDetail.chargedAt.name == 'DESTINATION' && x.isActive == true);
      this.itemData.charges.originCharges = this.itemData.charges.chargeDetails.filter(x => x.chargeDetail.chargedAt.name == 'ORIGIN' && x.isActive == true && x.chargeDetail.name != 'BL fee').map(this.utils.pick('chargeAmount', 'chargeDetail.name'))
        .reduce((sum, current) => sum + current.chargeAmount * this.searchParams.qty, 0)
        + this.itemData.charges.chargeDetails.filter(x => x.chargeDetail.chargedAt.name == 'ORIGIN' && x.isActive == true && x.chargeDetail.name == 'BL fee').map(this.utils.pick('chargeAmount', 'chargeDetail.name'))
          .reduce((sum, current) => sum + current.chargeAmount * this.searchParams.blCount, 0)

        ;
      this.itemData.charges.destinationCharges = this.itemData.charges.chargeDetails.filter(x => x.chargeDetail.chargedAt.name == 'DESTINATION' && x.isActive == true).map(this.utils.pick('chargeAmount', 'chargeDetail.name'))
        .reduce((sum, current) => sum + current.chargeAmount * this.searchParams.qty, 0);
      //console.log(this.itemData.charges.destinationCharges+this.itemData.charges.originCharges );

      console.log(this.itemData);
      console.log(this.searchParams);

    }
    else {

      this.router.navigate(['/home']);

    }



    // this.state$ = this.router.events
    //   .pipe(
    //     filter(e => e instanceof NavigationStart),
    //     map(() => this.router.getCurrentNavigation().extras.state.example)
    //   )


    //   this.portsSub = this.state$.subscribe(data=>
    //     this.itemData=data);
  }
  portsSub: Subscription;
  oriCuCode: any;
  destCucode: any;
  oriFxVal: number;
  destFxVal: number;
  noofTranist = 'No';
  ngOnInit() {


    this.transi = this.utils.getTransits(this.itemData.vesselSchedule, this.itemData.endDate);

    // console.log(this.itemData);
    // console.log(this.searchParams);
    this.oriCuCode = "USD_" + this.itemData.charges.originCurrency.currencyCode;
    this.destCucode = "USD_" + this.itemData.charges.destinationCurrency.currencyCode;

    let data = {

      code: this.oriCuCode + "," + this.destCucode
    }

    let fxVal: {
      key: ''
      rate: 0
    };

    this.apiService.getWithActionNameData('Utility', 'getFx', data).toPromise().then((data) => {


      this.oriFxVal = data.filter(x => x.key === this.oriCuCode)[0].rate;
      this.destFxVal = data.filter(x => x.key === this.destCucode)[0].rate;

    })


  }

  gotoNext() {


    let dataPassed =
    {
      selectedOrder: this.itemData,
      searchData: this.searchParams,
      fxOriginCharge: this.oriFxVal,
      fxDestCharge: this.destFxVal,


    }

    this.router.navigate(['/payment-request'], {
      state: { example: dataPassed }
    });
  }

}
