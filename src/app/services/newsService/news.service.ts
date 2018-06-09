import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
import {Observable} from "rxjs/Observable";
import   "rxjs/add/operator/map";
import   "rxjs/add/operator/do";
import   "rxjs/add/operator/catch";
import { INewsResult } from '../../serviceresults/INewsResult';
import { News } from '../../types/classes/News';
import { HttphelperService } from '../httpHelper/httphelper.service'; 
import { AppsettingsService } from '../appSettings/appsettings.service'; 
import { OperationRequest } from '../../servicerequests/OperationRequest'; 
import { SaveNewsRequest } from '../../servicerequests/SaveNewsRequest'; 
import { OperationResult } from '../../serviceresults/OperationResult'; 
import { GetNewsByIdResult } from '../../serviceresults/GetNewsByIdResult'; 
 
@Injectable()
export class NewsService {
  readonly ServiceApiUrl ='api/news/'; 
  readonly ServiceApiUrl_GetList = this.ServiceApiUrl + 'GetList';   
  private newsResult : Observable<INewsResult>
  constructor( private httpService : HttphelperService,private appSettings : AppsettingsService) { }
      
  Get(categoryId,currentPage) : Observable<INewsResult> 
  {   
    var requestData = new OperationRequest();
    requestData.SetCurrentPage(0)
    .SetPageCount(10)
    .SetCurrentPage(currentPage)
    .AddCriteria("CategoryId",categoryId); 
    return this.httpService.Post<INewsResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl_GetList,requestData);
  } 

  GetLastNews() : Observable<INewsResult> 
  {   
    var requestData = new OperationRequest();
    requestData.SetCurrentPage(0)
    .SetPageCount(10) 
    return this.httpService.Post<INewsResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl_GetList,requestData);
  } 

  GetById(newsId) : Observable<GetNewsByIdResult> 
  {   
    var requestData = new OperationRequest(); 
    return this.httpService.Get<GetNewsByIdResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl+newsId);
  } 

  GetImagePath(id)
  {
    return this.appSettings.GetSettings().ServerUrl +"uploads/img/news/"+id+".jpg";
  }

  Save(news :News) : Observable<OperationResult> 
  {   
    var requestData = new SaveNewsRequest(news); 
    return this.httpService.Post<OperationResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl,requestData);
  } 
  Delete(newsId) : Observable<OperationResult> 
  {    
    return this.httpService.Delete<OperationResult>(this.appSettings.GetSettings().ServerUrl + this.ServiceApiUrl+newsId);
  } 
}
 