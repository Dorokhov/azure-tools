import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { RedisDataStructure } from '../viewModels/redisDataStructures';
import { RedisKeyViewModel } from '../viewModels/redisKeyViewModel';
import { ExpandableViewModel } from '../viewModels/expandableViewModel';
import { CreateKeyDialogComponent } from '../components/create.key.component';

@Component({
  templateUrl: './redis/components/database.details.component.view.html',
  selector: 'database-details',
  inputs: ['selectedTreeViewModel']
})


export class DatabaseDetailsComponent {
  public selectedTreeViewModel: ExpandableViewModel;
  public _ = _;
  private dialog: MdDialog;

  constructor(dialog: MdDialog) {
    this.dialog = dialog;
  }

  public createNewKey() {
    console.log('create new key: clicked');
    let dialogRef = this.dialog.open(CreateKeyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('create key dialog: closed');
      //this.selectedOption = result;
    });
  }
}