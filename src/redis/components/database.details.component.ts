import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { RedisDataStructure } from '../viewModels/redisDataStructures';
import { RedisKeyViewModel } from '../viewModels/redisKeyViewModel';
import { ExpandableViewModel } from '../viewModels/expandableViewModel';
import { CreateKeyDialogComponent } from '../components/create.key.component';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { ReliableRedisClientPool } from '../services/reliableRedisClientPool';
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

  constructor(private redisClientPool: ReliableRedisClientPool, dialog: MdDialog) {
    this.dialog = dialog;
  }

  public async reloadKeys() {
    let dbVm = <DatabaseViewModel>this.selectedTreeViewModel;
    await dbVm.reloadChildren();
  }

  public createNewKey() {
    console.log('create new key: clicked');
    let dbVm = <DatabaseViewModel>this.selectedTreeViewModel;
    let dialogRef = this.dialog.open(CreateKeyDialogComponent, {disableClose: true});
    dialogRef.componentInstance.redis = this.redisClientPool.getClientFromDbVm(dbVm);
    dialogRef.componentInstance.dbVm = dbVm;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`create key dialog: closed and any added '${result.anyAdded}'`);

      if (result.anyAdded) {
        let confirmRef = this.dialog.open(ConfirmDialogComponent, {disableClose: true});
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