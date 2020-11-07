import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  userData:any;
  signUp:boolean;
  constructor( private router:Router) {

    if ( this.router.getCurrentNavigation().extras.state!=null)
    {
      var allData = this.router.getCurrentNavigation().extras.state.example;
    
        this.userData = allData.userData;
        this.signUp = allData.signup;
      console.log(allData);
    }
   }

  ngOnInit(): void {
  }

}
