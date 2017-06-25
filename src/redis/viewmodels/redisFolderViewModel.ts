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
        if (this.children.length === 0) {
            this.children = this.splitSubItems();
            this.expand();
            this.update();
        }
        else {
            console.log('display folder sub items: skip calculation');
            this.expand();
        }
    }

    public update() {
        this.ngZone.run(() => { this.getNode().treeModel.update(); });
    }

    public removeKey(keyVm: RedisKeyViewModel) {
        console.log(`remove key from folder: started removing of ${keyVm.name} key`);
        console.log(`remove key from folder: folder ${name} contains following children`);
        console.log(this.children);
        console.log(`and following source:`);
        console.log(this.source);

        _.remove(this.children, each => {
            return each instanceof RedisKeyViewModel && (<RedisKeyViewModel>each).equals(keyVm);
        });

        console.log(`remove key from folder: there are ${this.source.length} keys in source before remove`);
        _.remove(this.source, each => `${this.previous}${this.db.model.separator}${each}` === keyVm.name);
        console.log(`remove key from folder: there are ${this.source.length} keys in source after remove`);
        console.log(`remove key from folder: ended removing of ${keyVm.name} key`);
    }

    private splitSubItems(): ExpandableViewModel[] {
        let childrenFolders = _(this.source).sortBy()
            .filter(each => each.indexOf(this.db.model.separator) !== -1)
            .map(key => {
                var i = key.indexOf(this.db.model.separator);
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

                if (values.length >= 1) {
                    var folder = new RedisFolderViewModel(_.isEmpty(this.previous) ? `${key}` : `${this.previous}${this.db.model.separator}${key}`, values, this.treeModel, this.redis, key, this.db, this.dialog, this.keyChangesEmitter, this.ngZone, this.idProvider);
                    return folder;
                }

                return new RedisKeyViewModel(this.treeModel, this.redis, _.isEmpty(this.previous) ? `${key}` : `${this.previous}${this.db.model.separator}${key}`, this.db, this, this.dialog, this.keyChangesEmitter, this.idProvider)
            })
            .values()
            .value();

        let childrenKeys = _(this.source)
            .filter(each => each.indexOf(this.db.model.separator) === -1)
            .map(x => new RedisKeyViewModel(this.treeModel, this.redis, _.isEmpty(this.previous) ? `${x}` : `${this.previous}${this.db.model.separator}${x}`, this.db, this, this.dialog, this.keyChangesEmitter, this.idProvider))
            .value();

        return childrenFolders.concat(childrenKeys);
    }
}