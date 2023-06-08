import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css']
})
export class EditdialogComponent {
  newImageUrl: string;

  constructor(
    public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageUrl: string
  ) {
    this.newImageUrl = imageUrl;
  }

  saveImageUrl(): void {
    this.dialogRef.close(this.newImageUrl);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
