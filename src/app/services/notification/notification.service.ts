import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  error(message :string) :void
  {   
    this.toastr.error(message,"Developer News");
  }  

  success(message :string) :void
  {   
    this.toastr.success(message,"Developer News");
  } 

  info(message :string) :void
  {   
    this.toastr.info(message,"Developer News");
  } 

  warning(message :string) :void
  {   
    this.toastr.warning(message,"Developer News");
  } 
  clear(message :string) :void
  {   
    this.toastr.clear();
  } 
}
