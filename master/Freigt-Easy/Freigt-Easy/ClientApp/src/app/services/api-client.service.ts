import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
 
import { Observable, of, throwError } from 'rxjs';
import { ModelMapper } from '../utils/model-mapper';
 
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private _http: HttpClient) { }

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 
  //      'Accept': 'application/json'})
  // };


 
  public postMethod<T>(appData, url) {

     

    return this._http.post<T>(this.getUrl(url), appData);
  }
  public postMethodAction<T>(appData, url,actionName) {
 
 
    return this._http.post<any>(this.getUrl(url) + "/" + actionName, appData);
  }  
  
  

  private getUrl(url: string) {
    const trimmedUrl = url.startsWith('/') ? url.substring(1) : url;
    return `${environment.apiUrl}/${trimmedUrl}`;
  }

  public get <T>(url) :Observable<any[]>  {
    return this._http.get(this.getUrl(url)) as Observable<T[]>;

  }

  public getScalar(url,actionName,data=null) : Observable<any> {
     
    var strActionName='';
    if (data!=null)
    {

      
      strActionName = actionName + "?emailId=" +data;
    }
    else
    {
      strActionName = actionName;
    }
    return this._http.get(this.getUrl(url) + "/"+ strActionName)  as Observable<any>;

  }

  public getMore(url) :Observable<any[]>  {
    return this._http.get(this.getUrl(url)) as Observable<any[]>;

  }
  public getWithActionNameData<T>( url,  actionName, data):Observable<any[]>
  {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('requestData', JSON.stringify(data));
   
 
    return this._http.get(this.getUrl(url) + "/"+ actionName , {headers, params}) as Observable<[T]>; 
  }
       
  public getWithActionName<T>( url,  actionName):Observable<any[]>
  {
      //http://localhost:64320/api/utility/getAllRoles
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
 
    return this._http.get(this.getUrl(url) + "/"+ actionName , {headers}) as Observable<[T]>; 
  }
  public Delete<T>(url: string,
    param: number) {
     return this._http.delete<T>(this.getUrl(url) + '/' + param);
  }
  public getWithAction<T>(url,actionName,data):Observable<T>
  {
        
    
       

        const headers = new HttpHeaders().append('Content-Type', 'application/json');
        const params = new HttpParams().append('requestData', JSON.stringify(data));
        return this._http.get(this.getUrl(url) + "/Test" , {headers, params}) as Observable<T>; 


      //  return this._http.get(this.getUrl(url) +"/" + actionName, {headers: headers, params:params}) as Observable<any[]>; 

 
 


  }
  //http://localhost:64320/api/utility/getAllRoles
  
  public getWithActionColls<T>(url,actionName,data):Observable<[T]>
  {
        
    
  
        const headers = new HttpHeaders().append('Content-Type', 'application/json');
        const params = new HttpParams().append('requestData', JSON.stringify(data));
        return this._http.get(this.getUrl(url) + "/Test" , {headers, params}) as Observable<[T]>; 


      //  return this._http.get(this.getUrl(url) +"/" + actionName, {headers: headers, params:params}) as Observable<any[]>; 

 
 


  }
 
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
