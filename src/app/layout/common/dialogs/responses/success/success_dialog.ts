import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from './data';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './success.component.html',
  
})
export class SuccessComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){
    
  }

}