import {Component} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'create-key-dialog',
  templateUrl: './redis/components/create.key.component.view.html'
})

export class CreateKeyDialogComponent {
  constructor(public dialogRef: MdDialogRef<CreateKeyDialogComponent>) {}
}