import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { ApiClientService } from 'src/app/services/api-client.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  usersSub = new Subject<any[]>();
  userList:User[];
  constructor(private apiClient:ApiClientService, private authService:LoginService) { }

  ngOnInit(): void {


    
    let data ={

      isActive: false,
      partnerId: this.authService.currentUser.partnerId,
      roleName: this.authService.currentUser.roleName,
   
      }
      this.apiClient.getWithActionNameData<User>('user','GetUserList', data).subscribe((res)=>{
        this.userList = res;
        console.log(this.userList);
        this.usersSub.next(this.userList.slice());
      });


      }

}
