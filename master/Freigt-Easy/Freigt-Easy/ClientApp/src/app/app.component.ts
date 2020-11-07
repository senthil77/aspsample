import { Component, OnInit } from '@angular/core';
declare var $:any;
 import {StoreService} from './utils/store-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ria-hip';
  constructor(private store:StoreService )
  {
    
  }

  ngOnInit()
  {
    $("#sidebarCollapse").on('click', function(){
      $("#sidebar").toggleClass('active');
      });

 
    
  }
}
