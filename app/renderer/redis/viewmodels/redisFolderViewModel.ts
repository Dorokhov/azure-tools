import { MdDialog, MdDialogRef } from '@angular/material';
import { RedisDataStructure, RedisStringVM, RedisHashVM, RedisSetVM, RedisZSetVM } from './redisDataStructures';
import { ReliableRedisClient } from '../model/reliableRedisClient'
import { ReliableRedisClientPool } from '../services/reliableRedisClientPool';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';
import { RedisKeyViewModel } from './redisKeyViewModel';
import { IAsyncCommand, RedisStringActions, RedisHashActions, RedisSetActions, RedisZSetActions } from './redisKeyActions';
import { DatabaseViewModel } from './databaseViewModel';
import { KeyChangesEmitter } from '../services/keychangesemitter';
import { Component, NgZone } from '@angular/core';

export class RedisFolderViewModel extends ExpandableViewModel {
    public ttl: number;
    dataStructure: RedisDataStructure;
    isActive: boolean;
    commands: IAsyncCommand[];
    private redis: ReliableRedisClient;

    constructor(
        private previous: string,
        private source: string[],
        treeModel: object,
        redis: ReliableRedisClient,
        public name: string,
        public db: DatabaseViewModel,
        private dialog: MdDialog,
        private keyChangesEmitter: KeyChangesEmitter,
        private ngZone: NgZone,
        private idProvider: () => number) {
        super(treeModel, TreeItemType.Folder, name);
        this.redis = redis;
        this.id = idProvider();
    }

    public displaySubItems(node: any) {
        if (this.children.length == 0) {
            this.children = this.groupRec();
        }
        else {
            console.log('display folder sub items: skip calculation');
        }

        this.expand();
        this.update();
    }

    public update() {
        this.ngZone.run(() => { this.getNode().treeModel.update(); });
    }

    private groupRec(): ExpandableViewModel[] {
        let childrenFolders = _(this.source)
            .filter(each => each.indexOf(':') !== -1)
            .map(key => {
                var i = key.indexOf(':');
                var splittedKeys = [key.slice(0, i), key.slice(i + 1)];
                return splittedKeys;
            })
            .groupBy(x => x[0])
            .mapValues((value: string[][], key: string) => {
                let values: string[] = <string[]>_(value).map((each: string[]) => {
                    if (each.length === 2) {
                        return each[1];
                    }

                    return each;
                }).flatten().value();

                if (values.length > 1) {
                    var folder = new RedisFolderViewModel(`${this.previous}:${key}`, values, this.treeModel, this.redis, key, this.db, this.dialog, this.keyChangesEmitter, this.ngZone, this.idProvider);
                    return folder;
                }

                return new RedisKeyViewModel(this.treeModel, this.redis, `${this.previous}:${key}`, this.db, this.dialog, this.keyChangesEmitter, this.idProvider)
            })
            .values()
            .value();

        let childrenKeys = _(this.source)
            .filter(each => each.indexOf(':') === -1)
            .map(x => new RedisKeyViewModel(this.treeModel, this.redis, `${this.previous}:${x}`, this.db, this.dialog, this.keyChangesEmitter, this.idProvider))
            .value();

        return childrenFolders.concat(childrenKeys);
    }
}