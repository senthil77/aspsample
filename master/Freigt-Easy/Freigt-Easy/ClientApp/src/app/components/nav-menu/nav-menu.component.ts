import { Component, OnInit } from '@angular/core';
import { tokenUser, User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
declare var $:any;
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  currentUser:tokenUser;
  constructor(public service:LoginService, ) { }
 
  ngOnInit(): void {

    if (this.service.currentUser== null)    {

      this.currentUser =this.service.getCurrentUser();
      console.log(this.service.getCurrentUser())

      this.service.currentUser = this.service.getCurrentUser();
 
  
      this.service.userSubj.next(this.service.currentUser);
    }
     
 

    // Dropdown Menu Fade    
$(document).ready(function(){
  $(".dropdown").hover(
      function() { $('.dropdown-menu', this).fadeIn("fast");
      },
      function() { $('.dropdown-menu', this).fadeOut("fast");
  });
});
  }

  closeme() {
    $('.navbar-toggler:visible').click();
  }
  logOut(){
    this.closeme();
    this.currentUser=null;
    this.service.logout();
  }


}
