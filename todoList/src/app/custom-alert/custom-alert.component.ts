import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [],
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}