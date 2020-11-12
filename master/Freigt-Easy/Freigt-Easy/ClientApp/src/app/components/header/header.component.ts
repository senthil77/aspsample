import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public service:LoginService ) { }

  ngOnInit(): void {

    if (this.service.currentUser== null)    {

   

      this.service.currentUser = this.service.getCurrentUser();
 
  
      this.service.userSubj.next(this.service.currentUser);
    }
     
  }

}
