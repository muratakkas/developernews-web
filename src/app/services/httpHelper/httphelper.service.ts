import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient , HttpParams,HttpHeaders ,HttpErrorResponse} from '@angular/common/http'; 
import { Observable } from "rxjs/Observable";
import { OperationStatus } from '../../types/enums/OperationStatus'; 
import   "rxjs/add/operator/map";
import   "rxjs/add/operator/do";
import   "rxjs/add/operator/catch";  
import 'rxjs/add/observable/throw'; 
import { NotificationService } from './../notification/notification.service'
import { AuthService } from './../authService/auth.service'
import {EventEmitter} from '@angular/core';
import { ProgressbarStatus } from './../../types/enums/ProgressbarStatus'


@Injectable()
export class HttphelperService {

  eventManager: EventEmitter<ProgressbarStatus> = new EventEmitter(); 

  GetEventManager() :  EventEmitter<ProgressbarStatus>
  {
    return this.eventManager;
  }

  constructor(private _http : HttpClient,private notify: NotificationService,private authService: AuthService) { }
 
  Post<T>(url,data) : Observable<T> 
  {  
    this.eventManager.emit(ProgressbarStatus.START);
    return this._http.post(url,data,{ headers: this.authService.getHeaders() })
    .map((response : any) => {
     return this.CheckResult(response,this.eventManager,this.notify);
    })
    .catch(error => { 
      return this.CatchException(error,this.eventManager,this.notify);
    });
  }  
  Get<T>(url) : Observable<T> 
  {  
    this.eventManager.emit(ProgressbarStatus.START);
    return this._http.get(url,{ headers:  this.authService.getHeaders() })
    .map((response : any) => {
      return this.CheckResult(response,this.eventManager,this.notify);
     })
     .catch(error => {
       return this.CatchException(error,this.eventManager,this.notify);
     });
  }  

  Delete<T>(url) : Observable<T> 
  {  
    this.eventManager.emit(ProgressbarStatus.START);
    return this._http.delete(url,{ headers:  this.authService.getHeaders() })
    .map((response : any) => {
      return this.CheckResult(response,this.eventManager,this.notify);
     })
     .catch(error => {
       return this.CatchException(error,this.eventManager,this.notify);
     });
  }  


  CheckResult(response : any, eventManager : EventEmitter<ProgressbarStatus>, notify: NotificationService) {
    eventManager.emit(ProgressbarStatus.FINISH); 
    //Check if  response status is Failed then throw exception
    if(response.OperationStatus == OperationStatus.FAILED) 
    {
      notify.error( response.StatusMessage);
      return Observable.throw(response.StatusMessage); 
    } 
    return response; 
  }
  CatchException(error : any, eventManager : EventEmitter<ProgressbarStatus>, notify: NotificationService) {
    eventManager.emit(ProgressbarStatus.FINISH);
    notify.error( error.message);
    return Observable.throw(error.message);
  }

 
 
}
  