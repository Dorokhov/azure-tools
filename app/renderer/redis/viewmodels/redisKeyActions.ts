﻿import { MdDialog, MdDialogRef } from '@angular/material';
import { RedisDataStructure, RedisStringVM, RedisHashVM, RedisSetVM, RedisZSetVM } from './redisDataStructures';
import { ReliableRedisClient } from '../model/reliableRedisClient'
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';
import { ConfirmDialogComponent } from '../components/confirm.component';
import { Guard } from '../common/guard';
import { RedisKeyViewModel } from '../viewmodels/rediskeyviewmodel';
import { KeyChangesEmitter } from '../services/keychangesemitter';
import { ChangeTtlDialogComponent } from '../components/change.ttl.component';

export class RedisDatabaseActions {

}

export abstract class RedisKeyActions {
    private keyVm: RedisKeyViewModel;
    private dialog: MdDialog;
    private redis: ReliableRedisClient;
    private keyChangesEmitter: KeyChangesEmitter;

    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        Guard.ArgumentIsNotNil(dialog);
        this.keyVm = keyVm;
        this.dialog = dialog;
        this.redis = redis;
        this.keyChangesEmitter = keyChangesEmitter;
        this.changeTtlCommand = new AsyncCommandGenericParam('Change TTL', (newTtl: number) => { return this.changeTtl(newTtl); }, this.dialog);
        this.deleteCommand = new AsyncCommandGenericParam('Delete Key', () => this.deleteKey(), this.dialog);
    }

    public changeTtlCommand;
    public deleteCommand;

    protected async changeTtl() {
        let dialogRef = this.dialog.open(ChangeTtlDialogComponent);
        dialogRef.componentInstance.redis = this.redis;
        dialogRef.componentInstance.keyVm = this.keyVm;
        return new Promise((resolve, reject) => {
            dialogRef.afterClosed().subscribe(result => {
                resolve();
            });
        });
    }

    private deleteKey(): Promise<any> {
        let confirmRef = this.dialog.open(ConfirmDialogComponent);
        confirmRef.componentInstance.message = `Are you sure you want to delete '${this.keyVm.name} key'?`;
        return new Promise((resolve, reject) => {
            confirmRef.afterClosed().subscribe(result => {
                console.log(`confirm dialog: closed with result '${result.isConfirmed}'`);

                if (result.isConfirmed) {
                    this.keyChangesEmitter.keyDeleted(this.keyVm);
                }

                resolve();
            });
        });
    }

    private async renameKey() {

    }
}

export class RedisStringActions extends RedisKeyActions {
    public commands: IAsyncCommand[] = [this.changeTtlCommand, this.deleteCommand];

    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        super(keyVm, redis, dialog, keyChangesEmitter);
    }
}

export class RedisSetActions extends RedisKeyActions {

    public commands: IAsyncCommand[] = [this.changeTtlCommand, this.deleteCommand];
    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        super(keyVm, redis, dialog, keyChangesEmitter);
    }
}

export class RedisHashActions extends RedisKeyActions {

    public commands: IAsyncCommand[] = [this.changeTtlCommand, this.deleteCommand];
    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        super(keyVm, redis, dialog, keyChangesEmitter);
    }
}

export class RedisZSetActions extends RedisKeyActions {

    public commands: IAsyncCommand[] = [this.changeTtlCommand, this.deleteCommand];
    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        super(keyVm, redis, dialog, keyChangesEmitter);
    }
}

class AsyncCommand implements IAsyncCommand {

    constructor(name: string, public execute: () => Promise<void>, public dialog: MdDialog) {

    }
}

class AsyncCommandGeneric<TResult> implements IAsyncCommand {

    constructor(name: string, public execute: () => Promise<TResult>, public dialog: MdDialog) {

    }
}

class AsyncCommandGenericParam<T> implements IAsyncCommand {

    constructor(public name: string, public execute: (param: T) => Promise<void>, public dialog: MdDialog) {

    }
}

export interface IAsyncCommand {
    execute;
}