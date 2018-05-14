import { Injectable } from '@angular/core'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { QuestiondialogComponent } from '../../questiondialog/questiondialog.component'
import { Observable } from "rxjs/Observable";


@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog) { }

   title = "Developer News"; 


  public openConfirmationDialog(question): Observable<void> { 
    let dialogRef = this.dialog.open(QuestiondialogComponent, {
      width: '250px',
      data: { title: this.title, question: question }
    });
 return  dialogRef.afterClosed(); 
  }


}
