// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiClientService } from './api-client.service';
// import { HttpErrorResponse } from '@angular/common/http';
 
// import jwt_decode from "jwt-decode";
// import { ModelMapper } from '../utils/model-mapper';
// import { tokenUser } from '../models/user';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   returnUrl: string;
//   error = '';
//   public isAuthenticated = new BehaviorSubject<boolean>(false);
//   public roleName = new BehaviorSubject<string>('');
//   public fullName = new BehaviorSubject<string>('');
//   public currentUser = new BehaviorSubject<tokenUser>(null);
//   constructor(private router: Router,    private route: ActivatedRoute, private http: ApiClientService, ) {
//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }

//   async checkAuthenticated() {
//     const authenticated = await this.getToken()==null? false:true;
//     this.isAuthenticated.next(authenticated);
//     this.getName(this.getToken);
//     this.getRoleofLoggedInUser(this.getToken);
//     return authenticated;
//   }

//   async login(username: string, password: string) {

//    this.http.postMethod<any>({ username, password }, 'Authenticate');
//   }

//   getToken()
//   {

//     var token=localStorage.getItem('token');
//     if (token && !this.tokenExpired(token))
//     {
//       return token;
//     }
//     else
//     {
//       localStorage.removeItem('token');
   
//     this.router.navigate(['/login'])

//       return null;
//     }
    
//   }
//   public getName(tokenData){
 
 
//     var decoded = jwt_decode(tokenData);
 
//  var loggedUser= new ModelMapper(tokenUser).map(decoded);

//  if (loggedUser!=null)
//  {
 
//  console.log(loggedUser);
 
//   return loggedUser.fullName;
 
// }
 

//   }
//   public getRoleofLoggedInUser(tokenData){
 
 
//     var decoded = jwt_decode(tokenData);
 
//  var loggedUser= new ModelMapper(tokenUser).map(decoded);

//  if (loggedUser!=null)
//  {
 
//  console.log(loggedUser);
//  this.currentUser.next(loggedUser);
 
//   return loggedUser.role;
 
// }
 

//   }
//   private tokenExpired(token: string) {
//     if (token!=null)
//     {
//     const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    
//     return (Math.floor((new Date).getTime() / 1000)) >= expiry;
//     }else
//     {
//       return true;
//     }
//   }
  
//   async logout(redirect: string) {
//     // try {
//     //   await this.authClient.signOut();
//     //   this.isAuthenticated.next(false);
//     //   this.router.navigate([redirect]);
//     // } catch (err) {
//     //   console.error(err);
//     // }
//   }
// }