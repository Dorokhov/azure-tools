import { MdDialog, MdDialogRef } from '@angular/material';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { ReliableRedisClientPool } from '../services/reliableRedisClientPool';
import { Component, NgZone } from '@angular/core';
import { Profile, RedisServer, RedisDatabase } from '../model/profile';
import { ServerViewModel } from '../viewmodels/serverViewModel';
import { RedisKeyViewModel } from '../viewmodels/redisKeyViewModel';
import { RedisFolderViewModel } from '../viewmodels/redisFolderViewModel';

import { KeyChangesEmitter } from '../services/keychangesemitter';

export class DatabaseDetails {

}

export class DatabaseViewModel extends ExpandableViewModelGeneric<RedisDatabase> {
    private redis: ReliableRedisClient;
    private ngZone: NgZone;
    public details: DatabaseDetails;
    public serverVm: ServerViewModel;
    private currentProfile: Profile;

    constructor(
        currentProfile: Profile,
        serverVm: ServerViewModel,
        model: RedisDatabase,
        redis: ReliableRedisClient,
        ngZone: NgZone,
        treeModel: object,
        private idProvider: () => number,
        private dialog: MdDialog,
        private keyChangesEmitter: KeyChangesEmitter) {
        super(treeModel, model, TreeItemType.Database, model.name)
        this.redis = redis;
        this.ngZone = ngZone;
        this.serverVm = serverVm;
        this.treeModel = treeModel;
        this.id = idProvider();
        this.currentProfile = currentProfile;
    }

    public async search(searchPattern: string) {
        let keys = await this.redis.searchKeysAsync(this.model.number, searchPattern);
        console.log(`search: search by '${searchPattern}' pattern found ${keys.length} keys`);
        this.displayKeys(keys);
    }

    public async reloadChildren() {
        console.log('database: reload children');
        let keys = await this.setBusy(this.redis.keysAsync(this.model.number));
        this.displayKeys(keys);
        this.update();
    }

    public async displaySubItems(node: any) {
        if (this.children.length == 0) {
            console.log('database: no children, so loading from the server');
            let keys = await this.setBusy(this.redis.keysAsync(this.model.number));
            this.displayKeys(keys);
            this.ngZone.run(() => { node.treeModel.update(); });
        }
        else {
            this.expand();
            console.log('display database subitems: skip children load');
        }
    }

    public removeKey(keyVm: RedisKeyViewModel) {
        this.redis.del(keyVm.db.model.number, keyVm.name);
        _.remove(this.children, each => {
            return each instanceof RedisKeyViewModel && (<RedisKeyViewModel>each).equals(keyVm);
        });

        if (keyVm.folderVm !== null) {
            keyVm.folderVm.removeKey(keyVm);
        }
        
        this.update();
    }

    public update() {
        this.ngZone.run(() => { this.getNode().treeModel.update(); });
    }

    private async displayKeys(keys: string[]) {
        console.log(`number of keys to display in db '${this.model.number}' equals ${_.isNil(keys) ? 0 : keys.length}`);
        this.children.length = 0;

        console.log('display keys: grouping by folders started');
        this.children = this.splitSubItems('', keys);
        console.log('display keys: grouping by folders ended');

        if (this.isExpanded === true) {
            this.collapse();
        }

        this.isExpanded = true;
        this.expand();
    }

    private splitSubItems(previous: string, source: string[]): ExpandableViewModel[] {
        let childrenFolders = _(source)
            .filter(each => each.indexOf(this.model.separator) !== -1)
            .map(key => {
                var i = key.indexOf(this.model.separator);
                var splittedKeys = [key.slice(0, i), key.slice(i + 1)];
                return splittedKeys;
            })
            .groupBy(x => x[0])
            .mapValues((value: string[][], key: string) => {

                console.log(`map values: mapping key '${key}' and following value:`);
                console.log(value);
                let values: string[] = <string[]>_(value).map((each: string[]) => {
                    if (each.length === 2) {
                        return each[1];
                    }

                    return each;
                }).flatten().value();

                console.log(`map values: values length is ${values.length} and contains following items:`);
                console.log(values);
                if (values.length >= 1) {
                    var folder = new RedisFolderViewModel(_.isEmpty(previous) ? `${key}` : `${previous}${this.model.separator}${key}`, values, this.treeModel, this.redis, key, this, this.dialog, this.keyChangesEmitter, this.ngZone, this.idProvider);
                    return folder;
                }

                return new RedisKeyViewModel(this.treeModel, this.redis, _.isEmpty(previous) ? `${key}` : `${previous}${this.model.separator}${key}`, this, null, this.dialog, this.keyChangesEmitter, this.idProvider)
            })
            .values()
            .value();

        let childrenKeys = _(source)
            .filter(each => each.indexOf(this.model.separator) === -1)
            .map(x => new RedisKeyViewModel(this.treeModel, this.redis, _.isEmpty(previous) ? `${x}` : `${previous}${this.model.separator}${x}`, this, null, this.dialog, this.keyChangesEmitter, this.idProvider))
            .value();

        return childrenFolders.concat(childrenKeys);
    }
}