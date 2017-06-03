import { EventEmitter } from '@angular/core';
import { RedisKeyViewModel } from '../viewmodels/redisKeyViewModel';

export class KeyChangesEmitter {
    public keyDeleted$: EventEmitter<RedisKeyViewModel>;

    constructor() {
        this.keyDeleted$ = new EventEmitter();
    }

    public keyDeleted(keyVm: RedisKeyViewModel): void {
        this.keyDeleted$.emit(keyVm);
    }
}