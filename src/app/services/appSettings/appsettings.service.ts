import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs/Observable'; 
import { AppSettings } from '../../types/classes/AppSettings'; 
import { HttphelperService } from '../httpHelper/httphelper.service'; 

@Injectable()
export class AppsettingsService {
  private   settings =null;
 
  constructor(private httpService : HttphelperService,) {
  }
 
  GetSettings() : AppSettings
  {  
        if(this.settings == null)
        {
          this.settings = new AppSettings();
          var serverurl = document["appconfig"]["ApiServerUrl"];
          this.settings.ServerUrl =serverurl ? serverurl :"";
        }  
        
    return this.settings; 
    }; 
  }
  
 