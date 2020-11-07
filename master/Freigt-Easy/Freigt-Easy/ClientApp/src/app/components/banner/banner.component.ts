
	import { Component, OnInit } from '@angular/core';
import { VesselHeader } from 'src/app/models/vessel-header';
import { ApiClientService } from 'src/app/services/api-client.service';
  import { SwiperOptions } from 'swiper';
  
  @Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
  })
  export class BannerComponent implements OnInit {
  data:any;
    slideData = [
      {
        id: 4,
        name: "Vessel starting from Chennai-4",
      }, {
        id: 5,
        name: "Vessel Reaching to Chennai-5",
      }, 
      {
        id: 6,
        name: "Vessel Reaching to Chennai=6",
      },
      {
        id: 11,
        name: "Vessel Reaching to Chennai-11",
      }, 
      {
        id: 8,
        name: "Vessel Reaching to Chennai",
      }, {
        id: 7,
        name: "Vessel Reaching to Chennai",
      }, {
        id:1, 
        name: "Vessel Reaching to Chennai-1",
      }, {
        id: 3,
        name: "Vessel Reaching to Chennai",
      }, {
        id: 13,
        name: "Vessel Reaching to Chennai",
      }, {
        id: 14,
        name: "Vessel Reaching to Chennai",
      }
    ]
  
    config: SwiperOptions = {
      pagination: { el: '.swiper-pagination', clickable: true },
       
      allowTouchMove: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: true
      },
      breakpoints: {
        1024: {
          slidesPerView: 1
        },
        500: {
          slidesPerView: 1
        },
        400: {
          slidesPerView: 1
        },
        300: {
          slidesPerView: 1
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: true
    };
    constructor(private apiService:ApiClientService) { }
  

    getDate(dateValue:Date)
    {

      return new Date(dateValue).getDate() ;
    }

    goSearch()
    {}

    getMonth(dateValue:Date)
    {

      return new Date(dateValue).getMonth() ;
    }
    ngOnInit(): void {
      let data ={

        code: '7'
      }
 

      this.apiService.getWithActionColls<VesselHeader>('VesselSchedules','getList', data).toPromise().then((data=> 
        {
       
          this.data = data})).catch((err => {console.log(err)}));
    }
  
  }
  