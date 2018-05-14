import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuComponent } from './menu/menu.component';
import { NewsComponent } from './news/news.component';
import { NewsdetailComponent } from './newsdetail/newsdetail.component';
import { EditnewsComponent } from './editnews/editnews.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { AuthGuard } from './directives/authguard/authguard';

const routes: Routes = [{
  path: 'about/:id',
  component: AboutComponent,
},{
  path: 'categories',
  component: CategoriesComponent, 
}
,{
  path: 'news/:categoryId',
  component: NewsComponent,
}
,{
  path: 'newsdetail/:Id',
  component: NewsdetailComponent,
},{
  path: 'editnews/:newsId',
  component: EditnewsComponent,
  canActivate: [AuthGuard]
}
,{
  path: 'editcategory/:Id',
  component: EditcategoryComponent,
  canActivate: [AuthGuard]
}
,{
  path: 'menu',
  component: MenuComponent,
},
{
  path: '',
  component: HomeComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
