import { Component } from '@angular/core';
import { HttphelperService } from './services/httpHelper/httphelper.service'
import { ProgressbarStatus } from './types/enums/ProgressbarStatus'
import { AuthService } from './services/authService/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isShowProgressBar  = false;
  username = '';
  isUserAuthorized = false;
  
  constructor(public httpservice: HttphelperService,public authService: AuthService) { 

    httpservice.GetEventManager()
    .subscribe((result : ProgressbarStatus) => { 
      this.isShowProgressBar = result == ProgressbarStatus.START;
   }); 

  this.CheckIsAuthorized();
   
  }

  Login()
  { 
    this.authService.login();
    this.CheckIsAuthorized();
  }

  Logout()
  { 
    debugger;
    this.authService.logout();
    this.CheckIsAuthorized();
  }

  
 CheckIsAuthorized()
  { 
    this.authService.getIsAuthorized()
    .subscribe(  (_isUserAuthorized: boolean) => { 
      this.isUserAuthorized = _isUserAuthorized; 
      if(this.isUserAuthorized)
      {
        this.authService.getUserData()
        .subscribe(  (userData: any) => {   
          if(userData) 
          {
            this.authService.setUserId(userData.sub);
            this.username ="Welcome " + userData.name;  
          } 
          else this.username ='';
       });
      } else this.username ='';
   });
 
  }
 

}
