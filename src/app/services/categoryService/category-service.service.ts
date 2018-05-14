import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
import {Observable} from "rxjs/Observable";
import   "rxjs/add/operator/map";
import   "rxjs/add/operator/do";
import   "rxjs/add/operator/catch";
import { ICategoryResult } from '../../serviceresults/ICategoryResult';
import { Category } from '../../types/classes/Category';
import { HttphelperService } from '../httpHelper/httphelper.service'; 
import { AppsettingsService } from '../appSettings/appsettings.service'; 
import { OperationRequest } from '../../servicerequests/OperationRequest'; 
import { SaveCategoryRequest } from '../../servicerequests/SaveCategoryRequest'; 
import { OperationResult } from '../../serviceresults/OperationResult'; 
import { GetCategoryByIdResult } from '../../serviceresults/GetCategoryByIdResult';  
@Injectable()
export class CategoryService  {

  readonly ServiceApiUrl ='api/category/'; 
  readonly ServiceApiUrl_GetList = this.ServiceApiUrl + 'GetList'; 
 
  private newsResult : Observable<ICategoryResult>
  constructor( private httpService : HttphelperService,private appSettings : AppsettingsService) { }
  
  Get(parentCategoryId,currentPage) : Observable<ICategoryResult> 
  {   
    var requestData = new OperationRequest();
    requestData.SetCurrentPage(0)
    .SetPageCount(10)
    .SetCurrentPage(currentPage)
    .AddCriteria("ParentId",parentCategoryId); 
    return this.httpService.Post<ICategoryResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl_GetList,requestData);
  } 

  GetById(newsId) : Observable<GetCategoryByIdResult> 
  {   
    var requestData = new OperationRequest(); 
    return this.httpService.Get<GetCategoryByIdResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl+newsId);
  } 

  Save(news :Category) : Observable<OperationResult> 
  {   
    var requestData = new SaveCategoryRequest(news); 
    return this.httpService.Post<OperationResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl,requestData);
  } 
  Delete(newsId) : Observable<OperationResult> 
  {    
    return this.httpService.Delete<OperationResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl+newsId);
  } 


}
 