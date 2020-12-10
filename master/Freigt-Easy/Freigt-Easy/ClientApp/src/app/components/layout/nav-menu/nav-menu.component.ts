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

 
  constructor(public service:LoginService ) { }
 
  ngOnInit(): void {

    if (this.service.currentUser== null)    {

   

      this.service.currentUser = this.service.getCurrentUser();
 
  if (!this.service.currentUser ==null)
      this.service.userSubj.next(this.service.currentUser);
      else
      this.service.userSubj.next(null);
    }
  
  }

  closeme() {
    $('.navbar-toggler:visible').click();
  }
 


}
