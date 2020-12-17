import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiClientService } from '../services/api-client.service';
import {tokenUser, User} from '../models/user';

import jwt_decode from "jwt-decode";
import { ModelMapper } from '../utils/model-mapper'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;
  currentUser: tokenUser;
   loggedInSubj = new Subject<boolean>();
  userSubj = new Subject<tokenUser>();

 isAdminSupportSubj= new Subject<boolean>();
 isAdminSubj= new Subject<boolean>();

 isAdminSupport=false;
 isAdmin=false;
  expirationTimer: any;
 
  
  constructor(private http: ApiClientService, private router: Router,private route: ActivatedRoute) { 

    this.loggedIn = localStorage.getItem('token')? true:false;
  }

 
  
  isAuthenticated(){
    const promise = new Promise((resolve, reject) => {
      resolve(!!this.getToken());
    });
    return promise;
  }

  signUp(user: User){
    
    return this.http.postMethod<any>(user,'Authenticate' );
  }

  login(userName: string, password: string){
     
    return this.http.postMethod<any>({ userName, password }, 'Authenticate');
  }
  
   getToken()
  {

    var token=localStorage.getItem('token');
    if (token && !this.tokenExpired(token))
    {
      return token;
    }
    else
    {
      localStorage.removeItem('token');
   
    //this.router.navigate(['./home'])

      return null;
    }
    
  }


  private tokenExpired(token: string) {
    if (token!=null)
    {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }else
    {
      return true;
    }
  }
  
  public getLoggedInUser(tokenData){
 
 
      var decoded = jwt_decode(tokenData);
   
   var loggedUser= new ModelMapper(tokenUser).map(decoded);

   if (loggedUser!=null)
   {
    this.loggedIn = true;
    this.loggedInSubj.next(true);
    
    this.currentUser = loggedUser;
    

    this.userSubj.next(this.currentUser);

   if (loggedUser.role=="ADMIN")
   {
     this.isAdmin=true;
     this.isAdminSubj.next(true);
   }
   if (loggedUser.role=="ADMIN" || loggedUser.role=="SUPPORT")
   {
     this.isAdminSupport=true;
     this.isAdminSupportSubj.next(true);
   }
  }
  console.log(loggedUser);
     return loggedUser;

    }
 
    public getCurrentUser(){
 
 
    var decoded = jwt_decode(this.getToken());
   
    if (decoded!=null)
    {
      var loggedUser= new ModelMapper(tokenUser).map(decoded);
      
      this.loggedIn = true;
      this.loggedInSubj.next(true);
      
      this.currentUser = loggedUser;
      
  
      this.userSubj.next(this.currentUser);


    
      if (loggedUser.role=="ADMIN")
   {
     this.isAdmin=true;
     this.isAdminSubj.next(true);
   }
   if (loggedUser.role=="ADMIN" || loggedUser.role=="SUPPORT")
   {
     this.isAdminSupport=true;
     this.isAdminSupportSubj.next(true);
   }
     return loggedUser;
    }
    return null;

    }
 
   
  
    
  // }

  logout(){
    localStorage.removeItem('token');
    this.loggedIn=false;
   
    this.loggedInSubj.next(false);
    this.userSubj.next(null);
    
    this.router.navigate(['./login'])
    .then(() => {
       window.location.reload();
     })


  
  }

  

  autoLogout(expiresIn: number){
    this.expirationTimer =  setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

 

  getUsers(){
     
    return this.http.get('Users');
  }
 
    
}
