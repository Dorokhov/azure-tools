import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RedisTypes } from '../model/redisTypes';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { DatabaseViewModel } from '../viewmodels/databaseViewModel';

@Component({
  selector: 'create-key-dialog',
  templateUrl: './redis/components/create.key.component.view.html'
})

export class CreateKeyDialogComponent {
  public key: string = '';
  public types: string[] = [RedisTypes[RedisTypes.String], RedisTypes[RedisTypes.Hash], RedisTypes[RedisTypes.Set], RedisTypes[RedisTypes.ZSet]];
  public selectedType: string = RedisTypes[RedisTypes.String];
  public hash: string = '';
  public value: string = '';
  public score: number = 0;
  public errors: string[] = [];
  public isBusy: boolean;
  public redis: ReliableRedisClient;
  public dbVm: DatabaseViewModel;

  constructor(public dialogRef: MdDialogRef<CreateKeyDialogComponent>) {

  }

  public async add() {
    if (this.validate()) {
      switch (this.selectedType) {
        case RedisTypes[RedisTypes.String]:
          await this.setBusy(this.redis.setAsync(this.dbVm.model.number, this.key, this.value));
          break;
        case RedisTypes[RedisTypes.Hash]:
          break;
        case RedisTypes[RedisTypes.Set]:
          break;
        case RedisTypes[RedisTypes.ZSet]:
          break;
      }
    }
  }

  public addAndClose() {
    this.add();
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

  private validate(): boolean {
    this.errors.length = 0;
    if (_.isEmpty(this.key)) {
      this.errors.push('Key is required');
      return false;
    }

    switch (this.selectedType) {
      case RedisTypes[RedisTypes.Hash]:
        if (_.isEmpty(this.hash)) {
          this.errors.push('Hash is required');
          return false;
        }

        break;
    }

    return true;
  }

  private setBusy(promise: ng.IPromise<void>): ng.IPromise<void> {
    this.isBusy = true;
    promise.finally(() => { this.isBusy = false; });
    return promise;
  }
}