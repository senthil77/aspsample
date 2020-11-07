import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/models/user';
import { ApiClientService } from 'src/app/services/api-client.service';
import { HelperService } from 'src/app/services/helper.service';
import { StoreService } from 'src/app/utils/store-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  editUserForm:FormGroup;
  isSubmitted = false;
  loading = false;
  tempRole=1;
  tempPartnerId= 'xxx';

emailIdAvailable:boolean;
  constructor(public fb: FormBuilder, private helper : HelperService, private store:StoreService,
    private router:Router, private apiservice:ApiClientService) { 
    
      let pid = this.store._partnerId$.subscribe((data)=>{
        this.tempPartnerId = data;
         
      })
    }


  
  ngOnInit() {



         var res:number;
         let userRoles: UserRole[];
     
       
     
         let userRoleSub = this.store.tempRole$.subscribe((data)=> { 
           userRoles= data;
         
           if (data.filter(x=>x.roleName =="TEMP")[0])
           {
            this.tempRole=data.filter(x=>x.roleName =="TEMP")[0].id;
           };
         
         }
      
         );
      
 
    
         this.editUserForm = this.fb.group({
          firstName: new FormControl('',[Validators.required]),
          lastName:  new FormControl('',[Validators.required]),
          email: new FormControl('', [
              Validators.required,
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
              Validators.maxLength(200)]),
          password: ['', [Validators.required, Validators.minLength(6)]],
       
    
          confirmPassword: ['', [Validators.required, Validators.minLength(6), (control => this.helper.confirmPassword(control, this.editUserForm, 'password'))]],
          companyName: [''],
          activationCode: [''],
          id: 0,
          isActive: false,
          createdBy: [''],
          updatedBy: [''],
          createdAt: [''],
          updatedAt: [''],
          userRoleId:this.tempRole,
          partnerId:new FormControl(this.tempPartnerId)
           });
          
    
     
          
         
     
       
       
  }
 
  
  get signupFormControl() { return this.editUserForm.controls; }  

  goToWelcome(user:any)
  {
    let dataPassed=
    {
     userData: user,
      signup:true
   
    }
 
     this.router.navigate(['/welcome'], { 
       state: { example: dataPassed } 
     });
  }
isEmailExists:string;
  verifyEmailId(emailId)
  {
   
     
  }
  onSubmit()
  {
  
    this.editUserForm.controls['partnerId'].setValue(this.tempPartnerId);
   

  this.isSubmitted = true;
  if (!this.editUserForm.valid) {
    this.editUserForm.getRawValue();
    return false;
  } 
 
  else {

    this.apiservice.getScalar('Utility', 'IsEmailIdAvailable',    this.editUserForm.controls['email'].value ).toPromise().then((data)=>{
      this.isEmailExists= JSON.stringify(data);
      console.log(this.isEmailExists);

      if (this.isEmailExists == "false")
      {
        this.apiservice.postMethod(this.editUserForm.value, 'user').toPromise().then(data => this.goToWelcome(data)).catch(err=>console.log(err));

      }
      else
      {
     
        console.log('email id exists');
      }
     
    }).catch((err)=>{
      console.log(err);
    })


 
   
  }
}





}
