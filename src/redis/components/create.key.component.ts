import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RedisTypes } from '../model/redisTypes';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { DatabaseViewModel } from '../viewmodels/databaseViewModel';
import { RedisKeyViewModel } from '../viewmodels/redisKeyViewModel';
import { RedisStringVM, RedisHashVM, RedisSetVM, RedisZSetVM } from '../viewmodels/redisDataStructures';

@Component({
  selector: 'create-key-dialog',
  templateUrl: './redis/components/create.key.component.view.html'
})

export class CreateKeyDialogComponent {
  public key: string = '';
  public types: string[] = [RedisTypes[RedisTypes.String], RedisTypes[RedisTypes.Hash], RedisTypes[RedisTypes.Set], RedisTypes[RedisTypes.ZSet]];
  public selectedType: string = RedisTypes[RedisTypes.String];
  public field: string = '';
  public value: string = '';
  public score: number = 0;
  public errors: string[] = [];
  public isBusy: boolean;
  public redis: ReliableRedisClient;
  public dbVm: DatabaseViewModel;
  public anyAdded: boolean = false;
  public isEditMode: boolean = false;

  constructor(public dialogRef: MdDialogRef<CreateKeyDialogComponent>) {

  }

  public edit(keyVm: RedisKeyViewModel) {
    this.isEditMode = true;
    if (!_.isNil(keyVm)) {
      switch (keyVm.dataStructure.type) {
        case RedisTypes.String:
          let stringDataStructure = <RedisStringVM>keyVm.dataStructure;
          this.key = keyVm.name;
          this.selectedType = RedisTypes[stringDataStructure.type];
          this.value = stringDataStructure.value;
          break;
        case RedisTypes.Hash:
          let hashDataStructure = <RedisHashVM>keyVm.dataStructure;
          this.key = keyVm.name;
          this.selectedType = RedisTypes[hashDataStructure.type];
          let keyValue = _.first(hashDataStructure.selectedFields);
          if (!_.isNil(keyValue)) {
            this.field = keyValue.key;
            this.value = keyValue.value;
          }
          break;
        case RedisTypes.Set:
          let setDataStructure = <RedisSetVM>keyVm.dataStructure;
          this.key = keyVm.name;
          this.selectedType = RedisTypes[setDataStructure.type];
          let setKeyValue = _.first(setDataStructure.selectedItems);
          console.log('edit set: key value');
          console.log(setKeyValue);
          if (!_.isNil(setKeyValue)) {
            this.value = setKeyValue.value;
          }
          break;
        case RedisTypes.ZSet:
          let zsetDataStructure = <RedisZSetVM>keyVm.dataStructure;
          this.key = keyVm.name;
          this.selectedType = RedisTypes[zsetDataStructure.type];
          let zsetKeyValue = _.first(zsetDataStructure.selectedItems);
          console.log('edit zset: key value');
          console.log(zsetKeyValue);
          if (!_.isNil(zsetKeyValue)) {
            this.score = zsetKeyValue.value;
            this.value = zsetKeyValue.key;
          }
          break;
      }
    }
  }

  public async add() {
    if (this.validate()) {
      switch (this.selectedType) {
        case RedisTypes[RedisTypes.String]:
          await this.setBusy(this.redis.setAsync(this.dbVm.model.number, this.key, this.value));
          break;
        case RedisTypes[RedisTypes.Hash]:
          await this.setBusy(this.redis.hsetAsync(this.dbVm.model.number, this.key, this.field, this.value));
          break;
        case RedisTypes[RedisTypes.Set]:
          await this.setBusy(this.redis.saddAsync(this.dbVm.model.number, this.key, this.value));
          break;
        case RedisTypes[RedisTypes.ZSet]:
          await this.setBusy(this.redis.zaddAsync(this.dbVm.model.number, this.key, this.score, this.value));
          break;
      }

      this.anyAdded = true;
      console.log(`add new key: added key of type '${this.selectedType}', any added is set to '${this.anyAdded}'`);
    }
  }

  public async addAndClose() {
    await this.add();
    this.close();
  }

  public close() {
    console.log(`add new key: closing dialog with any added is set to '${this.anyAdded}'`);
    this.dialogRef.close({ anyAdded: this.anyAdded });
  }

  private validate(): boolean {
    this.errors.length = 0;
    if (_.isEmpty(this.key)) {
      this.errors.push('Key is required');
      return false;
    }

    switch (this.selectedType) {
      case RedisTypes[RedisTypes.Hash]:
        if (_.isEmpty(this.field)) {
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