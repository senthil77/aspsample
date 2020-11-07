import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';  
declare var $:any;
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
 

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
     
    private authService: LoginService) { 

   
    }

 
    ngOnInit() {
      
      this.loginForm = this.formBuilder.group({
       

        userName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: new FormControl('', [Validators.required])
      });
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get loginFormControl() { return this.loginForm.controls; }  


    login() {
    
 
      const val = this.loginForm.value;
  
      this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      this.loading = true; 
        if (val.userName && val.password) {       
           
            this.authService.login(val.userName, val.password).subscribe(data => {

              console.log(data);
              localStorage.setItem('token', data.token);
              this.authService.loggedIn = true;
              this.authService.loggedInSubj.next(true);
              
              this.authService.currentUser = this.authService.getLoggedInUser(data.token);
              console.log(this.authService.currentUser);
          
              this.authService.userSubj.next(this.authService.currentUser);
        
             

              this.router.navigate([this.returnUrl]);
        
            },
            error => {
            

              if (error instanceof HttpErrorResponse) {

                console.log(error.error.message);

                this.error= error.error.message;
                
                if (!error.status) {
                  console.log(error.message || error.toString());
                } else {
                  console.log(error);
                  switch (error.status) {
                    case 401:
                      this.router.navigateByUrl("/login");
                      break;
                    case 500:
                      this.router.navigateByUrl("/login");
                      console.log(`redirect to login`);
                      break;
                  }
                }
              } else {
                console.error("Other Errors");
              }
              
              this.loading = false;
            });
          }
        
  
  
          
          
    }
  }

  
  
   
  

 
