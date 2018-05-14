import { Injectable } from '@angular/core';
import { AppSettings } from '../../types/classes/AppSettings'; 

@Injectable()
export class AppsettingsService {
  private readonly settings = new AppSettings();
  constructor() { 

    this.settings.ServerUrl = "http://localhost:48817/";
  } 
  GetSettings() : AppSettings
  { 
    return this.settings; 
  }

}
