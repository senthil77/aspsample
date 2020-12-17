import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit{
  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  constructor() { }
  activityData = [{
    name:'Nirav joshi',
    image:'assets/images/users/1.jpg',
    commentTime:'5 minute ago',
    comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',

    bottomImage:'assets/images/big/img2.jpg',
    buttonColor:''

},
{
    name:'Sunil joshi',
    image:'assets/images/users/2.jpg',
    commentTime:'3 minute ago',
    comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',

    bottomImage:'',
    buttonColor:'primary'

},
{
    name:'Vishal Bhatt',
    image:'assets/images/users/3.jpg',
    commentTime:'1 minute ago',
    comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',

    bottomImage:'assets/images/big/img1.jpg',
    buttonColor:''

},
{
    name:'Dhiren Adesara',
    image:'assets/images/users/4.jpg',
    commentTime:'7 minute ago',
    comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',

    bottomImage:'',
    buttonColor:'warn'

}];
 
  slides = [{'image': '../../../assets/images/big/img1.jpg'},
  {'image': '../../../assets/images/big/img2.jpg'}, {'image': '../../../assets/images/big/img3.jpg'}, 
  {'image': '../../../assets/images/big/img4.jpg'}];

  ngOnInit(): void {
  }
  ngAfterViewInit()
  {
     
  }

}
