import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiClientService } from '../services/api-client.service';
import {tokenUser, User} from '../models/user';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { ReturnStatement } from '@angular/compiler';

export class ModelMapper<T> {
  _propertyMapping: any;
  _target: any;
  constructor(type: { new(): T; }) {
    this._target = new type();
    this._propertyMapping = this._target.constructor._propertyMap;
  }

  map(source) {
    Object.keys(this._target).forEach((key) => {
      const mappedKey = this._propertyMapping[key]
      if (mappedKey) {
        this._target[key] = source[mappedKey];
      }
      else {
        this._target[key] = source[key];
      }
    });
    Object.keys(source).forEach((key) => {
      const targetKeys = Object.keys(this._target);
      if (targetKeys.indexOf(key) === -1) {
        this._target[key] = source[key];
      }
    });
    return this._target;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;
  currentUser: tokenUser;
   loggedInSubj = new Subject<boolean>();
  userSubj = new Subject<tokenUser>();

 


  expirationTimer: any;
  isAdmin=false;
  
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
   
   
     return new ModelMapper(tokenUser).map(decoded);

    }
 
    public getCurrentUser(){
 
 
      var decoded = jwt_decode(this.getToken());
   
   
     return new ModelMapper(tokenUser).map(decoded);

    }
 
   
  
    
  // }

  logout(){
    localStorage.removeItem('token');
    this.loggedIn=false;
   
    this.loggedInSubj.next(false);
    this.userSubj.next(null);
 
    this.router.navigate(['./login'])
    // .then(() => {
    //   window.location.reload();
    // })


  
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
