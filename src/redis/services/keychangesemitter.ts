import { EventEmitter } from '@angular/core';
import { RedisKeyViewModel } from '../viewmodels/redisKeyViewModel';
import { ServerViewModel } from '../viewmodels/serverViewModel';

export class KeyChangesEmitter {
    public keyDeleted$: EventEmitter<RedisKeyViewModel>;
    public serverDeleted$: EventEmitter<ServerViewModel>;

    constructor() {
        this.keyDeleted$ = new EventEmitter();
        this.serverDeleted$ = new EventEmitter();
        console.log('event emmiter created');
    }

    public keyDeleted(keyVm: RedisKeyViewModel): void {
        this.keyDeleted$.emit(keyVm);
    }

    public serverDeleted(serverVm: ServerViewModel): void {
        console.log('raise event: server deleted');
        console.log(serverVm);
        this.serverDeleted$.emit(serverVm);
    }
}