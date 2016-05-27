'use strict'

import {ExpandableViewModel, IHierarchy} from './expandableViewModel';
import {RedisDatabaseViewModel} from './redisDatabaseViewModel';
import {RedisKeyViewModel} from './redisKeyViewModel';
import {TreeViewModel} from './treeViewModel';
import {settings} from '../redis-model/settings';
import {ReliableRedisClient, RedisConnection} from '../redis-model/reliableRedisClient';
import * as _ from 'lodash';

export class RedisAccountViewModel extends ExpandableViewModel implements IHierarchy {
    public items: RedisDatabaseViewModel[] = new Array<RedisDatabaseViewModel>();
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
            var promises = new Array<ng.IPromise<any>>();
            for (var index = 0; index < settings.getUserSettings().numberOfDatabaseToScan; index++) {
                var task = this.redis.getNumberOfKeysInDb(index);
                promises.push(task);
            }
            
            this.executingPromise = this.$q.all(promises);
            this.$log.debug('executingPromise')
            this.$log.debug(this.executingPromise)
            this.executingPromise.then(data => { 
                this.$log.debug('all DBs:')
                this.$log.debug(data);
                
                var notEmptyDbs = _.filter(data, each => each[1] > 0);
                this.items.length = 0;
                var dbVms = _.map(notEmptyDbs, each => new RedisDatabaseViewModel(this.$log, this.$timeout, this.$q, this.root, this.redis, each[2], each[2]));
                this.$log.debug('not empty redis DBs:')
                this.$log.debug(dbVms);
                this.items = dbVms;
                
                this.add(dbVms);
            });
        }
        else {
            this.add(this.items);
        }
    }

    collapse() {
        this.$log.debug('collapsing account "{0}", items count: {1}', this.name, this.items.length);
        this.isExpanded = false;
        if (this.items !== null) {
            _.forEach(this.items, each=>each.collapse());
            this.remove(this, this.items.length);
        }
    }
}