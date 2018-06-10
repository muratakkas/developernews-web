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
import {Subscription} from "rxjs";
import 'rxjs/add/observable/timer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  private currentPage  = 0;
  private categoryId = 0;
  private categoryCreateUserId;
  public news = new Array<News>();
  slideIndex = 0;
  timer= Observable.timer(2000,2000); // 1 second for 2 seconds (2000,1000) etc
private subscription: Subscription;

  constructor(private categoryService : CategoryService,private newsService : NewsService,public dialog: DialogService,public notify: NotificationService, private route:ActivatedRoute,private router:Router,private _sanitizer: DomSanitizer,protected authService: AuthService) {  
  }

  ngOnInit() {

    this.route.params.subscribe(queryStringSubscribe => 
      { 
        this.Get(); 
      }); 
  }
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  GetImageAsBase64(item:News)
  {    
    return this.newsService.GetImagePath(item.IconName);
  }
  
  Get()
    {   
      this.newsService.GetLastNews()
        .subscribe(( newsResult : INewsResult) =>
        { 
          newsResult.Items.forEach((itm:News) => { 
            this.news.push(itm);
          });

          this.subscription = this.timer.subscribe(ticks=> {
            this.LoadSlider();
          });
        }   
        ); 
    }

    OpenDetails(id)
    {
      this.router.navigate(['newsdetail/'+id]);
    } 

    LoadSlider()
    {
       
      var i;
      var slides = document.getElementsByClassName("mySlides");
      if(slides.length > 0)
      {

        var dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
           slides[i]["style"]["display"] = "none";  
        }
        this.slideIndex++;
        if ( this.slideIndex > slides.length) { this.slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[ this.slideIndex-1]["style"]["display"] = "block";  
        dots[ this.slideIndex-1].className += " active";

        document.getElementById("dotcontainer")["style"]["display"] = "block";  
        
      } 
    }
 
}
