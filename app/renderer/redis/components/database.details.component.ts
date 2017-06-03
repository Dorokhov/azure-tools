import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { RedisDataStructure } from '../viewModels/redisDataStructures';
import { RedisKeyViewModel } from '../viewModels/redisKeyViewModel';
import { ExpandableViewModel } from '../viewModels/expandableViewModel';
import { CreateKeyDialogComponent } from '../components/create.key.component';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { DatabaseViewModel } from '../viewmodels/databaseViewModel';
import { ConfirmDialogComponent } from '../components/confirm.component';

@Component({
  templateUrl: './redis/components/database.details.component.view.html',
  selector: 'database-details',
  inputs: ['selectedTreeViewModel']
})


export class DatabaseDetailsComponent {
  public selectedTreeViewModel: ExpandableViewModel;
  public _ = _;
  private dialog: MdDialog;

  constructor(private redis: ReliableRedisClient, dialog: MdDialog) {
    this.dialog = dialog;
  }

  public async reloadKeys() {
    let dbVm = <DatabaseViewModel>this.selectedTreeViewModel;
    await dbVm.reloadChildren();
  }

  public createNewKey() {
    console.log('create new key: clicked');
    let dialogRef = this.dialog.open(CreateKeyDialogComponent);
    dialogRef.componentInstance.redis = this.redis;
    dialogRef.componentInstance.dbVm = <DatabaseViewModel>this.selectedTreeViewModel;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`create key dialog: closed and any added '${result.anyAdded}'`);

      if (result.anyAdded) {
        let confirmRef = this.dialog.open(ConfirmDialogComponent);
        confirmRef.componentInstance.message = 'New keys were added. Do you want to reload database keys?';
        confirmRef.afterClosed().subscribe(confirmResult => {
          if (confirmResult.isConfirmed) {
            this.reloadKeys();
          }
        });
      }
    });
  }
}