import { Component, OnInit } from '@angular/core';
import { News } from '../types/classes/News'; 
import { NewsService } from '../services/newsService/news.service';  
import { GetNewsByIdResult } from '../serviceresults/GetNewsByIdResult'; 
import { OperationStatus } from '../types/enums/OperationStatus';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.scss']
})
export class NewsdetailComponent implements OnInit {

  currentNews : News;
  constructor(private newsService : NewsService,private route:ActivatedRoute,private router:Router,private _sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.route.params.subscribe(routeParamSubscribe => 
      {  
        debugger;
        if(routeParamSubscribe.Id > 0)
        this.newsService.GetById(routeParamSubscribe.Id)
        .subscribe(( newsResult : GetNewsByIdResult) =>    
        {  
        if(newsResult.OperationStatus == OperationStatus.SUCCESS)
        {
          debugger;
         this.currentNews = newsResult.Item;  
        }}       
        ); 
      });
  } 

  GetImageAsBase64(item:News)
  {    
    return this.newsService.GetImagePath(item.Id);
  }

}
