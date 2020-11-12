import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor  implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: LoginService, private router:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      
        const token = this.authService.getToken();
        if (token) {
 
         
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return next.handle(request)
      }
     
}