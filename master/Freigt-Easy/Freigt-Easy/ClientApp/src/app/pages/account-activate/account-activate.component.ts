import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Partner } from 'src/app/models/partner';
import { ApiClientService } from 'src/app/services/api-client.service';
import { StoreService } from 'src/app/utils/store-service';
import { loginUser, UserRole} from '../../models/user';
@Component({
  selector: 'app-account-activate',
  templateUrl: './account-activate.component.html',
  styleUrls: ['./account-activate.component.css']
})
export class AccountActivateComponent implements OnInit {

tokenParams:any;
userData:any;
editPartnerForm: FormGroup;
roleList: UserRole[];
roleListSub:Subscription;
constructor(private route: ActivatedRoute,private apiService:ApiClientService,
  private fb: FormBuilder, private store:StoreService, private router:Router
  ) {}
ngOnInit() {

  this.roleListSub= this.store.activeRoles$.subscribe((roleData) =>
  {
    this.roleList= roleData;
  }
  )
  

  this.editPartnerForm = this.fb.group({
    id: 0,
    isActive: new FormControl(false, [Validators.required]),
    createdBy: [''],
    updatedBy: [''],
    createdAt: [''],
    updatedAt: [''],
    partnerName: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: [''],
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
 

    email1: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),

    email2: new FormControl('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),

    phone1: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    phone2: new FormControl(null, [Validators.pattern('[0-9]{0,10}')]),

    contact1: new FormControl(null, [Validators.required]),
    contact2: [''],
  });
 
  this.route.queryParams.subscribe((e) => this.tokenParams =e);

  if (this.tokenParams!=undefined)
  {
    console.log(this.tokenParams.token);

    let data ={

      code: this.tokenParams.token
    }


    this.apiService.getWithActionColls<loginUser>('user','testwithaction', data).toPromise().then((data=> 
      {
        //console.log(data);
        this.userData = data

        this.editPartnerForm = this.fb.group({
          id: 0,
          isActive: new FormControl(false, [Validators.required]),
          createdBy: [''],
          updatedBy: [''],
          createdAt: [''],
          updatedAt: [''],
          partnerName: new FormControl(this.userData.companyName, [Validators.required]),
          address1: new FormControl('', [Validators.required]),
          address2: [''],
          city: new FormControl('', [Validators.required]),
          zipCode: new FormControl('', [Validators.required]),
          partnerTypeId: 0,
      
          email1: new FormControl(this.userData.email, [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ]),
      
          email2: new FormControl('', [
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ]),
      
          phone1: new FormControl(null, [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ]),
          phone2: new FormControl(null, [Validators.pattern('[0-9]{0,10}')]),
      
          contact1: new FormControl(this.userData.firstName + this.userData.lastName, [Validators.required]),
          contact2: [''],
        });
      
      })).catch((err => {console.log(err)}));
        
 
 
      }
 
  
  else
  {
    console.log("contact customer Support")
  }
 

}
goToWelcome(partner:Partner)
{
  let dataPassed=
  {
   userData: partner,
   signup:false
 
  }

   this.router.navigate(['/welcome'], { 
     state: { example: dataPassed } 
   });
}

onSubmit() {
 
 

this.apiService
    .postMethod<Partner>(this.editPartnerForm.value, 'Partner').toPromise()
    
       .then((data) => {
        if (data.id >0) {
          this.goToWelcome(data);
        }
      }).catch((err) => {
               console.log(err);
             })

  
}

}
