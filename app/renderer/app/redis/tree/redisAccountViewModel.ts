'use strict'

import {ExpandableViewModel, IHierarchy} from './expandableViewModel';
import {RedisKeyViewModel} from './redisKeyViewModel';
import {TreeViewModel} from './treeViewModel';
import {ReliableRedisClient, RedisConnection} from '../redis-model/reliableRedisClient';
import * as _ from 'lodash';

export class RedisAccountViewModel extends ExpandableViewModel implements IHierarchy {
    public items: RedisKeyViewModel[] = new Array<RedisKeyViewModel>();
    public name: string;
    public executingPromise: any;

    constructor(
        public $log: ng.ILogService,
        public $timeout: any,
        protected $q: ng.IQService,
        public root: TreeViewModel,
        public connection: RedisConnection,
        public redis: ReliableRedisClient) {
        super(root.items);

        this.name = connection.host;
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
            this.executingPromise = this.redis.keysAsync().then((keys) => {
                this.$timeout(() => {
                this.items = _.map(keys, x => new RedisKeyViewModel(this.$log, this.$timeout, this.$q, this.redis, x));
                    this.add(this.items);
                });
            });
        }
        else {
            this.add(this.items);
        }
    }

    collapse() {
        this.isExpanded = false;
        if (this.items !== null) {
            this.remove(this.items.length);
        }
    }
}