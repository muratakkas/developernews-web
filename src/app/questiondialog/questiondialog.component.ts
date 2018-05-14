import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-questiondialog',
  templateUrl: './questiondialog.component.html',
  styleUrls: ['./questiondialog.component.scss']
})
export class QuestiondialogComponent {

 
  
  constructor(
    public dialogRef: MatDialogRef<QuestiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  ngOnInit() {
  }

}
