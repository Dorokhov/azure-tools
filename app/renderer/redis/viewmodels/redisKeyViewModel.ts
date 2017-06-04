import { MdDialog, MdDialogRef } from '@angular/material';
import { RedisDataStructure, RedisStringVM, RedisHashVM, RedisSetVM, RedisZSetVM } from './redisDataStructures';
import { ReliableRedisClient } from '../model/reliableRedisClient'
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';
import { IAsyncCommand, RedisStringActions, RedisHashActions, RedisSetActions, RedisZSetActions } from './redisKeyActions';
import { DatabaseViewModel } from './databaseViewModel';
import { KeyChangesEmitter } from '../services/keychangesemitter';

export class RedisKeyViewModel extends ExpandableViewModel {
    public ttl: number;
    dataStructure: RedisDataStructure;
    isActive: boolean;
    commands: IAsyncCommand[];
    private redisStringActions: RedisStringActions;
    private redisSetActions: RedisStringActions;
    private redisHashActions: RedisStringActions;
    private redisZSetActions: RedisStringActions;

    constructor(
        private redis: ReliableRedisClient,
        public name: string,
        public db: DatabaseViewModel,
        private dialog: MdDialog,
        keyChangesEmitter: KeyChangesEmitter) {
        super(TreeItemType.Key, name);
        this.redisStringActions = new RedisStringActions(this, this.redis, this.dialog, keyChangesEmitter);
        this.redisHashActions = new RedisHashActions(this, this.redis, this.dialog, keyChangesEmitter);
        this.redisSetActions = new RedisSetActions(this, this.redis, this.dialog, keyChangesEmitter);
        this.redisZSetActions = new RedisZSetActions(this, this.redis, this.dialog, keyChangesEmitter);
    }

    public async loadDetailsAsync() {
        console.log('loading TTL..');
        this.ttl = await this.redis.ttlAsync(this.db.model.number, this.name);
        console.log(`TTL: ${this.ttl}`);

        this.dataStructure = await this.loadDataStructureAsync();
    }

    public equals(other: RedisKeyViewModel) {
        return this.db.model.number === other.db.model.number && this.name === other.name;
    }

    private async loadDataStructureAsync() {
        let type = await this.redis.typeAsync(this.db.model.number, this.name);
        console.log(`type: ${type}`);
        let value = null;
        switch (type) {
            case 'string':
                value = await this.setBusy(this.redis.getAsync(this.db.model.number, this.name));
                this.commands = this.redisStringActions.commands;
                return new RedisStringVM(value);
            case 'hash':
                value = await this.setBusy(this.redis.hgetallAsync(this.db.model.number, this.name));
                this.commands = this.redisHashActions.commands;
                return new RedisHashVM(value);
            case 'set':
                value = await this.setBusy(this.redis.smembersAsync(this.db.model.number, this.name));
                this.commands = this.redisSetActions.commands;
                return new RedisSetVM(value);
            case 'zset':
                value = await this.setBusy(this.redis.zrangeAsync(this.db.model.number, this.name));
                this.commands = this.redisZSetActions.commands;
                return new RedisZSetVM(value);
            default:
                break;
        }
    }
}