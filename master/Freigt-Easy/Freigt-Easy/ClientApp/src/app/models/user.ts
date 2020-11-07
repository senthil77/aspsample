export class User {

    constructor(
        public id: number,
        public lastName: string,
        public firstName: string,
        public roleName: string,

        public companyName: string,
        public email: string,
        public jwtToken?: string,    
        ) {}
      
         get isLogged() {
       
          return !!name;
        }
    }
export class tokenUser
{
    
    public email: string;
    public exp:number;
    public firstName: string;
    public fullName: string;
 
 
    public roleName: string;
    public sub:string 
    public userId:number
    public partnerId:number
}
      
    export class loginUser
    {
    public firstName:string;
    public  lastName:string;
    public email:string;
    public password:string;
    public  companyName:string;
    public activationCode:string;
    public id:number;
    public  isActive:boolean;
    public createdBy:string;
    public updatedBy:string;
    public roleId:number;
    
    }

    export class UserRole
    {
        public  id :number;
        public  roleName :string
    }
