'use strict'

import IDialogService = angular.material.IDialogService;
import {RedisConnection} from '../redis-model/reliableRedisClient';

export class RedisConnectionVM {
    public port: number = 6379;
    public host = '';
    public password = '';
    private onSave : (connection: RedisConnection) => void;

    constructor(public dialog: IDialogService, onSave: (connection: RedisConnection) => void) {
        this.onSave = onSave;
    }

    save() {
        this.onSave(new RedisConnection(this.port, this.host, this.password));
        this.dialog.cancel();
    }
}