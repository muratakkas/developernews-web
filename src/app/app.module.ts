
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Import Services
import { HttphelperService } from './services/httpHelper/httphelper.service';  
import { AppsettingsService } from './services/appSettings/appsettings.service'; 
import { DialogService } from './services/dialog/dialog.service'
import { NotificationService } from './services/notification/notification.service'
import { NewsService } from './services/newsService/news.service'; 
import { CategoryService } from './services/categoryService/category-service.service'; 
import { AuthService } from './services/authService/auth.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; 
//Import Modules
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule,Validators } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

//Import Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuComponent } from './menu/menu.component';
import { NewsComponent } from './news/news.component';
import { NewsdetailComponent } from './newsdetail/newsdetail.component';
import { EditnewsComponent } from './editnews/editnews.component'; 
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { QuestiondialogComponent } from './questiondialog/questiondialog.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { AuthModule, OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InjectionToken } from '@angular/core';

//Import Directives
import { AuthGuard } from './directives/authguard/authguard';
 

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CategoriesComponent,
    MenuComponent,
    NewsComponent,
    NewsdetailComponent,
    EditnewsComponent,
    QuestiondialogComponent,
    EditcategoryComponent, 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule ,
    AuthModule.forRoot(),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center', 
    })
  ],
  entryComponents: [QuestiondialogComponent],
  providers: [AppsettingsService,HttphelperService,NewsService,CategoryService,ToastrService,DialogService,NotificationService,AuthService,OidcSecurityService,AuthGuard,
    { provide: 'ORIGIN_URL', useFactory: getBaseUrl },
        { provide: 'API_URL', useFactory: apiUrlFactory },
        { provide: 'IDENTITY_URL', useFactory: identityUrlFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function getBaseUrl() {
  return  document["appconfig"]["WebServerUrl"];
}

export function apiUrlFactory() {
  return document["appconfig"]["ApiServerUrl"] ; 
}

export function identityUrlFactory() {
  return document["appconfig"]["IdentityServerUrl"]; 
}
