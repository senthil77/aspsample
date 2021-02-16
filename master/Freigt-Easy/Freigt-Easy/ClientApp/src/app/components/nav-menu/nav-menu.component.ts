import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
 
 
declare var $:any;
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
 roleName:string;
  constructor(public service:LoginService ) {

    $(document).ready(function(){$(".sidebarNavigation .navbar-collapse").hide().clone().appendTo("body").
    removeAttr("class").addClass("sideMenu").show();
    $("body").append("<div class='overlay'></div>");$(".navbar-toggle, .navbar-toggler").on("click",function()
    {$(".sideMenu").addClass($(".sidebarNavigation").attr("data-sidebarClass"));$(".sideMenu, .overlay").
    toggleClass("open");$(".overlay").on("click",function(){$(this).removeClass("open");$(".sideMenu").
    removeClass("open")})});$("body").on("click",".sideMenu.open .nav-item",
    function(){if(!$(this).hasClass("dropdown")){$(".sideMenu, .overlay").toggleClass("open")}});
    $(window).resize(function(){if($(".navbar-toggler").is(":hidden")){$(".sideMenu, .overlay").hide()}
    else{$(".sideMenu, .overlay").show()}})});
   
  }


 async ngOnInit() {

 
  if (this.service.currentUser== null)    {

    this.service.currentUser = this.service.getCurrentUser();
    this.roleName= this.service.currentUser===null? '': this.service.currentUser.roleName;
if (!this.service.currentUser ==null)
    this.service.userSubj.next(this.service.currentUser);
    else
    this.service.userSubj.next(null);
  }


 
  }

  closeme() {
    
  }
  

}
