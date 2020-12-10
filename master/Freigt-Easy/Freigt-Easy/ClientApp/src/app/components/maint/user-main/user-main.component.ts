import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { User, UserRole } from '../../../models/user';
import { ApiClientService } from '../../../services/api-client.service';
import { LoginService } from '../../../services/login.service';
import { NotificationService } from '../../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from '../../../utils/store-service';
import { HelperService } from '../../../services/helper.service';
import { flagSet } from '@coreui/icons';
declare var $:any;
@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {
  
  usersSub = new Subject<any[]>();
  userList:User[];
  public sortDirection :string= 'asc'
  public sortingName: string ='id';
  title = 'modal2';
  isSubmitted=false;
  roleList:UserRole[];
  roleListSub:Subscription;
  editAcivateUserForm: FormGroup;
  constructor(private apiClient:ApiClientService, private authService:LoginService, private notify:NotificationService,
    private fb: FormBuilder, private modalService: NgbModal, private store:StoreService, private helper:HelperService) {

      this.editAcivateUserForm = this.fb.group({
        roleId: ['', [Validators.required]],
        isActive: ['',[Validators.required]],
        isSubscribed: ['',[Validators.required]],
        userId: ['',[Validators.required]],
        validUpTo: [new Date().toISOString().split('T')[0],[Validators.required]],
         });
     }
  sort(fieldname)
  {
 
   if (this.sortDirection == 'asc')
     this.sortDirection= 'desc';
   else
   this.sortDirection= 'asc';
   
    this.sortingName =fieldname;
  }

  resetActivationLink(userId:number)
  {
 

      this.apiClient.postMethodAction(userId, 'User','ResetActivateLink').toPromise().then((data) => 
      { 
        if (data.id == userId)
        {
        this.notify.showSuccess("Link has been Sent");
        }else
        {
          this.notify.showError("Link is not sent:contact cusomter care");
        }
      
       
      }).catch((err)=> {

        this.notify.showError(JSON.stringify(err));
      });

  }


  
  get activateUserControl() { return this.editAcivateUserForm.controls; }  
 ngOnInit() {

  
  this.roleListSub= this.store.activeRoles$.subscribe(roleData=>
    this.roleList=roleData
    //console.log(roleData)
    );

  let data ={

      isActive: false,
      partnerId: this.authService.currentUser.partnerId,
      roleName: this.authService.currentUser.roleName,
   
      }
      this.apiClient.getWithActionNameData<any>('user','GetUserList', data).subscribe((res)=>{
        this.userList = res;
        console.log(this.userList);
        this.usersSub.next(this.userList.slice());
      });




 }
 openModal(targetModal,activeUser) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
  });
 
  if (activeUser!=null)
{   this.editAcivateUserForm.patchValue({
roleId:"",
isActive:activeUser.isActive,
isSubscribed:activeUser.partner.isSusbcribed,
userId:activeUser.id,
validUpTo:this.helper.formatDate(activeUser.validUpTo),
  });}
 
 }
 onSubmit() {
  this.isSubmitted=true;
 if (!this.helper.inFuture(new Date(this.activateUserControl.validUpTo.value)))
 {
    return;
 
 }

 else{

  
    this.apiClient.postMethodAction<User>( this.editAcivateUserForm.getRawValue(),'User','Activate').subscribe((res)=>{
     console.log(res)
    });

    this.modalService.dismissAll();
 }
  console.log("res:", this.editAcivateUserForm.getRawValue());


 }
   

}
