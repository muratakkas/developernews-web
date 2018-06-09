import { Component, OnInit } from '@angular/core';
import { News } from '../types/classes/News'; 
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl,Validators } from '@angular/forms';
import { NewsService } from '../services/newsService/news.service'; 
import { OperationResult } from '../serviceresults/OperationResult'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { QuestiondialogComponent } from '../questiondialog/questiondialog.component'; 
import { DialogService } from '../services/dialog/dialog.service'; 
import { NotificationService } from '../services/notification/notification.service';
import { OperationStatus } from '../types/enums/OperationStatus';
import { GetNewsByIdResult } from '../serviceresults/GetNewsByIdResult'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editnews',
  templateUrl: './editnews.component.html',
  styleUrls: ['./editnews.component.scss']
})
export class EditnewsComponent implements OnInit {
   
  model = new News();
  myForm = new FormGroup({
    CategoryId: new FormControl('', Validators.required) ,
    Subject: new FormControl('', Validators.required) ,
    Content: new FormControl('') ,
    Icon: new FormControl('') ,
    Id: new FormControl('') 
  });
  submitted = false;
  imageSrc = "";
  uploadedImageSrc = "";
  iconName = "";
  newsContent = "";
  readonly IMAGE_PREFIX = "data:image/jpeg;base64,";

  constructor(private newsService : NewsService,public dialog: DialogService,public notify: NotificationService,private route:ActivatedRoute,private router:Router) { }

 
  openDialog(): void {  
    this.dialog.openConfirmationDialog("News will be saved. Do you want to continue ?")
    .subscribe(result => {
       if(result)
       {
        this.newsService.Save(this.model)
        .subscribe(( newsResult : OperationResult) =>    
        {  
        if(newsResult.OperationStatus == OperationStatus.SUCCESS)
        {
          this.notify.success("News has been saved succesfully!");
          this.router.navigate(['news/'+this.model.CategoryId]);
        }}       
        ); 
       } 
    }); 
  }

  ngOnInit() {     

    debugger;
      this.route.params.subscribe(routeParamSubscribe => 
        {   
          this.route.queryParams.subscribe(queryStringSubscribe => 
            { 
     
              if(queryStringSubscribe.CategoryId > 0) 
              this.myForm.controls.CategoryId.setValue(queryStringSubscribe.CategoryId);
              
              if(routeParamSubscribe.newsId > 0)
              this.newsService.GetById(routeParamSubscribe.newsId)
              .subscribe(( newsResult : GetNewsByIdResult) =>    
              {  
              if(newsResult.OperationStatus == OperationStatus.SUCCESS)
              {
                this.bindModelToForm(newsResult.Item);
              }}       
              ); 
            }); 
        });
 
  } 
 
 bindModelToForm(Item : News)
 { 
  this.myForm.controls.CategoryId.setValue(Item.CategoryId);
  this.myForm.controls.Subject.setValue(Item.Subject);
  this.myForm.controls.Id.setValue(Item.Id);
  this.imageSrc =  this.newsService.GetImagePath(Item.IconName); 
  this.newsContent = Item.Content;
  this.iconName =Item.IconName;
 }

  
 bindFormToModel(formModel : News) : News
 {
  formModel.CategoryId = parseInt(this.myForm.controls['CategoryId'].value);
  formModel.Content = this.newsContent;
  formModel.Icon = this.removeImagePrefix(this.uploadedImageSrc); 
  formModel.IconName = this.iconName; 
  return formModel;
 }

 GetImage()
 {    
   return this.uploadedImageSrc.length > 0 ? this.uploadedImageSrc :this.imageSrc;
 }
  
 CheckImageSelected()
 {    
   return this.uploadedImageSrc.length > 0 || this.imageSrc.length > 0;
 }
  clearIcon() {
    this.imageSrc = "";
    this.uploadedImageSrc = "";
    window["jQuery"]("#Icon").val("");  
  }
  handleIconChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.uploadedImageSrc = reader.result;
    console.log(this.imageSrc)
  } 
 
save(model: News, isValid: boolean) { 
  this.submitted = true;
  if(!isValid || (this.newsContent == "" || this.newsContent.length <= 100) || !this.CheckImageSelected()) return;  
  this.model = this.bindFormToModel(model);
  this.openDialog(); 
}

removeImagePrefix(imageSrc : any) {
 return imageSrc.replace(this.IMAGE_PREFIX,"");
}

addImagePrefix(imageSrc : any) {
  return this.IMAGE_PREFIX+imageSrc;
 }
 
 
}
