import { Component, OnInit } from '@angular/core';
import { tokenUser } from './models/user';
 
import { StoreService } from './utils/store-service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'freightgix';
  isAuthenticated: boolean;
  roleName:string;
  fullName:string;
constructor(private store:StoreService)
{

  
  
 

 
}
  ngOnInit()
  {
 
    // $(document).ready(function(){$(".sidebarNavigation .navbar-collapse").hide().clone().appendTo("body").
    // removeAttr("class").addClass("sideMenu").show();
    // $("body").append("<div class='overlay'></div>");$(".navbar-toggle, .navbar-toggler").on("click",function()
    // {$(".sideMenu").addClass($(".sidebarNavigation").attr("data-sidebarClass"));$(".sideMenu, .overlay").
    // toggleClass("open");$(".overlay").on("click",function(){$(this).removeClass("open");$(".sideMenu").
    // removeClass("open")})});$("body").on("click",".sideMenu.open .nav-item",
    // function(){if(!$(this).hasClass("dropdown")){$(".sideMenu, .overlay").toggleClass("open")}});
    // $(window).resize(function(){if($(".navbar-toggler").is(":hidden")){$(".sideMenu, .overlay").hide()}
    // else{$(".sideMenu, .overlay").show()}})});
  }
}
