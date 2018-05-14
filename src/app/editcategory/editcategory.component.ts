import { Component, OnInit } from '@angular/core';
import { Category } from '../types/classes/Category'; 
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl,Validators } from '@angular/forms';
import { CategoryService } from '../services/categoryService/category-service.service'; 
import { OperationResult } from '../serviceresults/OperationResult'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { QuestiondialogComponent } from '../questiondialog/questiondialog.component'; 
import { DialogService } from '../services/dialog/dialog.service'; 
import { NotificationService } from '../services/notification/notification.service';
import { OperationStatus } from '../types/enums/OperationStatus';
import { GetCategoryByIdResult } from '../serviceresults/GetCategoryByIdResult'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {

  model = new Category();
  myForm = new FormGroup({
    Id: new FormControl('') ,
    ParentId: new FormControl('') ,
    Name: new FormControl('', Validators.required) , 
    Icon: new FormControl('') , 
  });
  submitted = false;
  imageSrc = "";
  newsContent = "";
  readonly IMAGE_PREFIX = "data:image/jpeg;base64,";

  constructor(private categoryService : CategoryService,public dialog: DialogService,public notify: NotificationService,private route:ActivatedRoute,private router:Router) { }

 
  openDialog(): void {  
    this.dialog.openConfirmationDialog("Category will be saved. Do you want to continue ?")
    .subscribe(result => {
       if(result)
       {
        this.categoryService.Save(this.model)
        .subscribe(( newsResult : OperationResult) =>    
        {  
        if(newsResult.OperationStatus == OperationStatus.SUCCESS)
        {
          this.notify.success("Category has been saved succesfully!");

          this.router.navigate(['categories/'+  (this.model.ParentId != null ? this.model.ParentId : "" )]);
        }}       
        ); 
       } 
    }); 
  }

  ngOnInit() {  
    debugger;   
      this.route.params.subscribe(queryStringSubscribe => 
        { 
          if(queryStringSubscribe.Id > 0)
          {
         
            this.categoryService.GetById(queryStringSubscribe.Id)
            .subscribe(( newsResult : GetCategoryByIdResult) =>    
            {  
            if(newsResult.OperationStatus == OperationStatus.SUCCESS)
            {
              this.bindModelToForm(newsResult.Item);
            }}       
            );
          }
        
        });
 
  } 
 
 bindModelToForm(Item : Category)
 {  
  this.myForm.controls.Name.setValue(Item.Name); 
  this.myForm.controls.Id.setValue(Item.Id);
  this.myForm.controls.ParentId.setValue(Item.ParentId);
  this.imageSrc = this.addImagePrefix(Item.Icon);  
 }

  
 bindFormToModel(formModel : Category) : Category
 {  
  formModel.Icon = this.removeImagePrefix(this.imageSrc); 
  return formModel;
 }

 
  clearIcon() {
    this.imageSrc = "";
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
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  } 
 
save(model: Category, isValid: boolean) { 
  this.submitted = true;
  if(!isValid ||this.imageSrc == "") return;  
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
