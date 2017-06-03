import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { DatabaseViewModel } from '../viewmodels/databaseViewModel';
import { RedisKeyViewModel } from '../viewmodels/redisKeyViewModel';

@Component({
  selector: 'change-ttl-dialog',
  templateUrl: './redis/components/change.ttl.component.view.html'
})

export class ChangeTtlDialogComponent {
  public message: string = '';
  public types: string[] = ['Custom', 'Never'];
  public ttl: number = -1;
  public _selectedType: string = 'Custom';
  public redis: ReliableRedisClient;
  public keyVm: RedisKeyViewModel;

  constructor(public dialogRef: MdDialogRef<ChangeTtlDialogComponent>) {

  }

  get selectedType(): string {
    return this._selectedType;
  }

  @Input()
  set selectedType(selectedType: string) {
    this._selectedType = selectedType;
    if (this._selectedType === 'Never') {
      this.ttl = -1;
    }
  }

  public async change() {
    await this.redis.expireAsync(this.keyVm.db.model.number, this.keyVm.name, this.ttl);
    console.log(`the TTL of ket '${this.keyVm.name}' in db '${this.keyVm.db.model.number}' changed to '${this.ttl}' seconds`);
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}