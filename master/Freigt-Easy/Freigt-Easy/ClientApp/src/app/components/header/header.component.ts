import { Component, OnInit } from '@angular/core';
import { tokenUser } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public service:LoginService ) { }
user:tokenUser;
  ngOnInit(): void {

   // this.service.getCurrentUser().subscribe(name => this.user = name);
  }

}
