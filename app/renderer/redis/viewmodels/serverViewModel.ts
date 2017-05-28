import { Component, NgZone } from '@angular/core';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { Profile, RedisServer, RedisDatabase } from '../model/profile';
import { DatabaseViewModel } from '../viewmodels/databaseViewModel';

export class ServerViewModel extends ExpandableViewModel {
    private redis: ReliableRedisClient;
    private ngZone: NgZone;
    private treeModel: object;
    private idProvider: () => number;

    constructor(server: RedisServer, redis: ReliableRedisClient, ngZone: NgZone, treeModel: object, idProvider: () => number) {
        super(TreeItemType.Server, server.host);
        this.redis = redis;
        this.ngZone = ngZone;
        this.treeModel = treeModel;
        this.id = idProvider();
        this.idProvider = idProvider;
    }

    public async search(searchPattern: string) {
        console.log(`search: server ${this.name}: searching`);
        if (this.children.length == 0) {
            this.displaySubItemsInternal();
        }

        for (let each of this.children) {
            let db = <DatabaseViewModel>each;
            console.log(`search: server ${this.name}: database ${db.id}: searching`);
            await db.search(searchPattern);
        }
    }

    public displaySubItems(node: any) {
        this.displaySubItemsInternal();
        node.treeModel.update();
    }

    private displaySubItemsInternal() {
        this.children.length = 0;
        _.map(_.range(0, 10 + 1, 1), each => {
            let db = new RedisDatabase();
            db.name = each.toString();
            db.number = each;
            this.children.push(new DatabaseViewModel(this, db, this.redis, this.ngZone, this.treeModel, this.idProvider))
        });
        this.isExpanded = true;

        var node = this.treeModel.getNodeById(this.id);
        node.toggleExpanded();
        this.treeModel.update();
    }
}