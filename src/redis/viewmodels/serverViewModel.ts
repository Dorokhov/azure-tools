import { Component, NgZone } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';
import { ReliableRedisClient } from '../model/reliableRedisClient';
import { ReliableRedisClientPool } from '../services/reliableRedisClientPool';
import { Profile, RedisServer, RedisDatabase } from '../model/profile';
import { DatabaseViewModel } from '../viewmodels/databaseViewModel';
import { KeyChangesEmitter } from '../services/keychangesemitter';

export class ServerViewModel extends ExpandableViewModel {
    private redis: ReliableRedisClient;
    private ngZone: NgZone;
    private idProvider: () => number;
    private currentProfile: Profile;

    constructor(
        currentProfile: Profile,
        public model: RedisServer,
        redisClientPool: ReliableRedisClientPool,
        ngZone: NgZone,
        treeModel: object,
        idProvider: () => number,
        private dialog: MdDialog,
        private keyChangesEmitter: KeyChangesEmitter) {
        super(treeModel, TreeItemType.Server, model.host);
        this.redis = redisClientPool.getClientFromSeverVm(this);
        this.ngZone = ngZone;
        this.treeModel = treeModel;
        this.id = idProvider();
        this.idProvider = idProvider;
        this.currentProfile = currentProfile;
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
            this.children.push(new DatabaseViewModel(this.currentProfile, this, db, this.redis, this.ngZone, this.treeModel, this.idProvider, this.dialog, this.keyChangesEmitter))
        });
        this.isExpanded = true;

        var node = this.treeModel.getNodeById(this.id);
        node.toggleExpanded();
        this.treeModel.update();
    }

    public equals(other: ServerViewModel): boolean {
        if (_.isNil(other)) {
            return false;
        }

        if (_.isNil(other.model)) {
            return false;
        }

        if (_.isNil(other.model.host)) {
            return false;
        }

        return this.model.host === other.model.host;
    }
}