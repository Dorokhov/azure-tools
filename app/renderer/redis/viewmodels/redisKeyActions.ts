import { MdDialog, MdDialogRef } from '@angular/material';
import { RedisDataStructure, RedisStringVM, RedisHashVM, RedisSetVM, RedisZSetVM } from './redisDataStructures';
import { ReliableRedisClient } from '../model/reliableRedisClient'
import { ReliableRedisClientPool } from '../services/reliableRedisClientPool';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';
import { ConfirmDialogComponent } from '../components/confirm.component';
import { Guard } from '../common/guard';
import { RedisKeyViewModel } from '../viewmodels/rediskeyviewmodel';
import { KeyChangesEmitter } from '../services/keychangesemitter';
import { ChangeTtlDialogComponent } from '../components/change.ttl.component';
import { CreateKeyDialogComponent } from '../components/create.key.component';

export class RedisDatabaseActions {

}

export abstract class RedisKeyActions {
    protected keyVm: RedisKeyViewModel;
    protected dialog: MdDialog;
    protected redis: ReliableRedisClient;
    
    private keyChangesEmitter: KeyChangesEmitter;

    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        Guard.ArgumentIsNotNil(dialog);
        this.keyVm = keyVm;
        this.dialog = dialog;
        this.redis = redis;
        this.keyChangesEmitter = keyChangesEmitter;
        this.changeTtlCommand = new AsyncCommandGenericParam('Change TTL', () => { return this.changeTtl(); }, this.dialog, 'fa-clock-o dbPrime');
        this.deleteCommand = new AsyncCommandGenericParam('Delete Key', () => this.deleteKey(), this.dialog, 'fa-remove warning');
        this.reloadValueCommand = new AsyncCommandGenericParam('Reload Value', () => this.reloadValue(), this.dialog, 'fa-refresh dbPrime');
        this.editCommand = new AsyncCommandGenericParam('Edit', () => { return this.edit(); }, dialog, 'fa-edit dbPrime');
    }

    public changeTtlCommand;
    public deleteCommand;
    public reloadValueCommand;
    public editCommand;

    protected async changeTtl(): Promise<any> {
        let dialogRef = this.dialog.open(ChangeTtlDialogComponent, { disableClose: true });
        dialogRef.componentInstance.redis = this.redis;
        dialogRef.componentInstance.keyVm = this.keyVm;
        return new Promise((resolve, reject) => {
            dialogRef.afterClosed().subscribe(result => {
                if (result.isSaved) {
                    let promise = this.keyVm.loadDetailsAsync();
                }
                else {
                    resolve();
                }
            });
        });
    }

    private deleteKey(): Promise<any> {
        let confirmRef = this.dialog.open(ConfirmDialogComponent, { disableClose: true });
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

    private async reloadValue() {
        await this.keyVm.loadDetailsAsync();
    }

    private async renameKey() {

    }

    protected edit(): Promise<any> {
        return new Promise((resolve, reject) => {
            let dialogRef = this.dialog.open(CreateKeyDialogComponent, { disableClose: true });
            dialogRef.componentInstance.redis = this.redis;
            dialogRef.componentInstance.dbVm = this.keyVm.db;
            dialogRef.componentInstance.edit(this.keyVm);
            dialogRef.afterClosed().subscribe(result => {
                console.log(`edit key '${this.keyVm.name}' dialog: closed and any added '${result.anyAdded}'`);
                if (result.anyAdded === true) {
                    this.keyVm.loadDetailsAsync().then(() => resolve());
                }
            })
        });
    }
}

export class RedisStringActions extends RedisKeyActions {

    public commands: IAsyncCommand[] = [this.changeTtlCommand, this.reloadValueCommand, this.editCommand, this.deleteCommand];

    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        super(keyVm, redis, dialog, keyChangesEmitter);
    }
}

export class RedisSetActions extends RedisKeyActions {

    public commands: IAsyncCommand[] = [
        this.changeTtlCommand,
        this.reloadValueCommand,
        new AsyncCommandGenericParam('Add Item', () => { return this.edit(); }, this.dialog, 'fa-plus dbPrime'),
        new AsyncCommandGenericParam('Edit Selected Item', () => { return this.edit(); }, this.dialog, 'fa-edit dbPrime'),
        this.deleteCommand];

    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        super(keyVm, redis, dialog, keyChangesEmitter);
    }
}

export class RedisHashActions extends RedisKeyActions {

    public commands: IAsyncCommand[] = [
        this.changeTtlCommand,
        this.reloadValueCommand,
        new AsyncCommandGenericParam('Add Field', () => { return this.edit(); }, this.dialog, 'fa-plus dbPrime'),
        new AsyncCommandGenericParam('Edit Selected Field', () => { return this.edit(); }, this.dialog, 'fa-edit dbPrime'),
        this.deleteCommand];

    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        super(keyVm, redis, dialog, keyChangesEmitter);
    }
}

export class RedisZSetActions extends RedisKeyActions {

    public commands: IAsyncCommand[] = [
        this.changeTtlCommand,
        this.reloadValueCommand,
        new AsyncCommandGenericParam('Add Item', () => { return this.edit(); }, this.dialog, 'fa-plus dbPrime'),
        new AsyncCommandGenericParam('Edit Selected Item', () => { return this.edit(); }, this.dialog, 'fa-edit dbPrime'),
        this.deleteCommand];
    constructor(keyVm: RedisKeyViewModel, redis: ReliableRedisClient, dialog: MdDialog, keyChangesEmitter: KeyChangesEmitter) {
        super(keyVm, redis, dialog, keyChangesEmitter);
    }
}

class AsyncCommand implements IAsyncCommand {

    constructor(name: string, public execute: () => Promise<void>, public dialog: MdDialog, public iconClass: string = '') {

    }
}

class AsyncCommandGeneric<TResult> implements IAsyncCommand {

    constructor(name: string, public execute: () => Promise<TResult>, public dialog: MdDialog, public iconClass: string = '') {

    }
}

class AsyncCommandGenericParam<T> implements IAsyncCommand {

    constructor(public name: string, public execute: (param: T) => Promise<void>, public dialog: MdDialog, public iconClass: string = '') {

    }
}

export interface IAsyncCommand {
    execute;
}