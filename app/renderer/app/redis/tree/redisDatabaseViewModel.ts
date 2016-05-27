'use strict'

import {ExpandableViewModel, IHierarchy} from './expandableViewModel';
import {RedisDataStructure, RedisStringVM} from './redisDataStructures';
import {RedisKeyViewModel} from './redisKeyViewModel';
import {TreeViewModel} from './treeViewModel';
import {ReliableRedisClient, RedisConnection} from '../redis-model/reliableRedisClient';
import * as _ from 'lodash';

export class RedisDatabaseViewModel extends ExpandableViewModel implements IHierarchy {
    public items: RedisKeyViewModel[] = new Array<RedisKeyViewModel>();
    public executingPromise: ng.IPromise<any>;

    constructor(
        public $log: ng.ILogService,
        public $timeout: any,
        protected $q: ng.IQService,
        public root: TreeViewModel,
        public redis: ReliableRedisClient,
        public name: string,
        public db: number) {
        super(root.items);
    }
    
    expandOrCollapse() {
        if (this.isExpanded) {
            this.collapse();
        } else {
            this.expand();
        }
    }
    
    expand() {
        this.isExpanded = true;
        if (this.items.length === 0) {
            this.executingPromise = this.redis.keysAsync(this.db).then((keys) => {
                this.$timeout(() => {
                    this.items = _.map(keys, key => new RedisKeyViewModel(this.$log, this.$timeout, this.$q, this.redis, key, this.db));
                    this.add(this.items);
                });
            });
        }
        else {
            this.add(this.items);
        }
    }

    collapse() {
        this.$log.debug('collapsing db "{0}", items count: {1}', this.db, this.items.length);
        this.isExpanded = false;
        if (this.items !== null) {
            this.remove(this, this.items.length);
        }
    }
}