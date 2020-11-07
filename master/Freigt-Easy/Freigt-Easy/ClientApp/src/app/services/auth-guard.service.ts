import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: LoginService, private router: Router) { }

   


  canActivate(
    route: ActivatedRouteSnapshot,
    status: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let url: string = status.url;
 
      return this.authService.isAuthenticated()
        .then ((authenticated: boolean) => {
            if (authenticated){
           
              
              this.authService.loggedInSubj.next(true);
           
            
              return true;
            }else{
              this.router.navigate(['/login']);
            }
        });
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    status: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, status);
  }
}
