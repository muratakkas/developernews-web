import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryService } from '../services/categoryService/category-service.service'; 
import { Observable} from "rxjs/Observable";
import { Category } from '../types/classes/Category'; 
import { ICategoryResult } from '../serviceresults/ICategoryResult'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogService } from '../services/dialog/dialog.service'; 
import { NotificationService } from '../services/notification/notification.service';
import { OperationStatus } from '../types/enums/OperationStatus';
import { OperationResult } from '../serviceresults/OperationResult'; 
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  private currentPage  = 0;
  private categoryId = 0;

  public categories = new Array<Category>();
  constructor(private categoryService : CategoryService,public dialog: DialogService,public notify: NotificationService, private route:ActivatedRoute,private router:Router,private _sanitizer: DomSanitizer,protected authService: AuthService) {  
  }

  ngOnInit() {
  
    this.route.params.subscribe(queryStringSubscribe => 
      { 
        this.categoryId = queryStringSubscribe.categoryId;
        this.Get();
      });
 
  }
 
  IsShowEditButtons(userId)
  {
    
    return this.authService.CheckIsUserAuthorizedToEditDelete(userId);
  }

  GoBack()
  {
    
  }
  IsShowAddButtons()
  {
    return this.authService.isAuthenticated();
  }

  Edit(id)
  {
    this.router.navigate(['editcategory/'+id]);
  }

  Add(id)
  {
    this.router.navigate(['editcategory/-1']);
  }

  OpenNews(id)
  {
    this.router.navigate(['news/'+id]);
  }

  Delete(id)
  {
    this.dialog.openConfirmationDialog("Category will be deleted. Do you want to continue ?")
    .subscribe(result => {
       if(result)
       {
        this.categoryService.Delete(id)
        .subscribe(( newsResult : OperationResult) =>    
        {  
        if(newsResult.OperationStatus == OperationStatus.SUCCESS)
        {
          this.notify.success("Category has been deleted succesfully!");
          this.categories.length=0;
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
  
  GetImageAsBase64(item:Category)
  {    
    return this.categoryService.GetImagePath(item.IconName);
  }
  Get()
    {   
      this.categoryService.Get(this.categoryId,this.currentPage)
        .subscribe(( newsResult : ICategoryResult) =>     
        {  
          debugger;
        newsResult.Items.forEach((itm:Category) => { 
            this.categories.push(itm);
          }); 
        }
               ); 
    }
}
