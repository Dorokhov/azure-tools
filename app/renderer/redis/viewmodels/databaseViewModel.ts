import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { Component, NgZone } from '@angular/core';
import { Profile, RedisServer, RedisDatabase } from '../model/profile';
import { ServerViewModel } from '../viewmodels/serverViewModel';
import { RedisKeyViewModel } from '../viewmodels/redisKeyViewModel';

export class DatabaseDetails {

}

export class DatabaseViewModel extends ExpandableViewModelGeneric<RedisDatabase> {
    private redis: ReliableRedisClient;
    private ngZone: NgZone;
    private server: ServerViewModel;
    private treeModel: object;
    public details: DatabaseDetails;

    constructor(server: ServerViewModel, model: RedisDatabase, redis: ReliableRedisClient, ngZone: NgZone, treeModel: object, idProvider: () => number) {
        super(model, TreeItemType.Database, model.name)
        this.redis = redis;
        this.ngZone = ngZone;
        this.server = server;
        this.treeModel = treeModel;
        this.id = idProvider();
    }

    public async search(searchPattern: string) {
        let keys = await this.redis.searchKeysAsync(this.model.number, searchPattern);
        console.log(`search: search by '${searchPattern}' pattern found following keys:`);
        console.log(keys);
        this.displayKeys(keys);
    }

    public async displaySubItems(node: any) {
        if (this.children.length == 0) {
            let keys = await this.setBusy(this.redis.keysAsync(this.model.number));
            this.displayKeys(keys);
            this.ngZone.run(() => { node.treeModel.update(); });
        }
        else {
            this.expand();
            console.log('display database subitems: skip children load');
        }
    }

    private async displayKeys(keys: string[]) {
        console.log(`number of keys loaded from db '${this.model.number}' is ${_.isNil(keys) ? 0 : keys.length}`);
        this.children.length = 0;
        this.isExpanded = true;

        _.map(keys, key => {
            this.children.push(new RedisKeyViewModel(this.redis, key, this.model.number));
        });

        this.expand();
    }

    private expand() {
        let node = this.treeModel.getNodeById(this.id);
        node.toggleExpanded();
    }
}