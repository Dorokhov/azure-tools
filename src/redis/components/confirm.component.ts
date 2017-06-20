import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'create-key-dialog',
  templateUrl: './redis/components/confirm.component.view.html'
})

export class ConfirmDialogComponent {
  public message: string = '';
  
  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }


  public confirm() {
    this.dialogRef.close({ isConfirmed: true });
  }

  public reject() {
    this.dialogRef.close({ isConfirmed: false });
  }
}