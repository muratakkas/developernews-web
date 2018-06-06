import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NewsService } from '../services/newsService/news.service'; 
import { CategoryService } from '../services/categoryService/category-service.service'; 
import { Observable} from "rxjs/Observable";
import { News } from '../types/classes/News'; 
import { INewsResult } from '../serviceresults/INewsResult'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogService } from '../services/dialog/dialog.service'; 
import { NotificationService } from '../services/notification/notification.service';
import { AuthService } from '../services/authService/auth.service';
import { OperationStatus } from '../types/enums/OperationStatus';
import { OperationResult } from '../serviceresults/OperationResult';  
import { GetCategoryByIdResult } from '../serviceresults/GetCategoryByIdResult'; 

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  
  private currentPage  = 0;
  private categoryId = 0;
  private categoryCreateUserId;
  public news = new Array<News>();
  constructor(private categoryService : CategoryService,private newsService : NewsService,public dialog: DialogService,public notify: NotificationService, private route:ActivatedRoute,private router:Router,private _sanitizer: DomSanitizer,protected authService: AuthService) {  
  }

  ngOnInit() {

    this.route.params.subscribe(queryStringSubscribe => 
      { 
        this.categoryId = queryStringSubscribe.categoryId;

        this.categoryService.GetById(this.categoryId)
        .subscribe(( newsResult : GetCategoryByIdResult) =>    
        {  
        if(newsResult.OperationStatus == OperationStatus.SUCCESS)
        {
        this.categoryCreateUserId = newsResult.Item.CreateUser; 
          this.Get();
        }}       
        ); 
      });
   
  }
 
  Edit(id)
  {
    this.router.navigate(['editnews/'+id], { queryParams: { CategoryId:this.categoryId } });
  }

  Add(id)
  {
    this.router.navigate(['editnews/-1'], { queryParams: { CategoryId:this.categoryId } });
  }

  OpenDetails(id)
  {
    this.router.navigate(['newsdetail/'+id]);
  } 

  IsShowEditButtons(userId)
  {
    return this.authService.CheckIsUserAuthorizedToEditDelete(userId);
  }

  IsShowAddButtons()
  { 
    return this.authService.isAuthenticated() &&  this.authService.CheckIsUserAuthorizedToEditDelete(this.categoryCreateUserId);
  }

  Delete(id)
  {
    this.dialog.openConfirmationDialog("News will be deleted. Do you want to continue ?")
    .subscribe(result => {
       if(result) 
       {
        this.newsService.Delete(id)
        .subscribe(( newsResult : OperationResult) =>    
        {  
        if(newsResult.OperationStatus == OperationStatus.SUCCESS)
        {
          this.notify.success("News has been deleted succesfully!");
          this.news.length=0;
          this.currentPage=0;
          this.Get();
        }}       
        ); 
       } 
    }); 
  }
 

  LoadMoreNews()
  {   
    this.currentPage++;
    this.Get();
  }

  GetContentFirstList(item:News)
  {    
    return item.Content;
  }

  GetImageAsBase64(item:News)
  {    
    return this.newsService.GetImagePath(item.Id);
  }
  
  Get()
    {   
      this.newsService.Get(this.categoryId,this.currentPage)
        .subscribe(( newsResult : INewsResult) =>     
          newsResult.Items.forEach((itm:News) => { 
            this.news.push(itm);
          }) 
        ); 
    }
}
