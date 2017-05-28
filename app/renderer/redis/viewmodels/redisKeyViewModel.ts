import { RedisDataStructure, RedisStringVM, RedisHashVM, RedisSetVM, RedisZSetVM } from './redisDataStructures';
import { ReliableRedisClient } from '../model/reliableRedisClient'
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './expandableViewModel';

export class RedisKeyViewModel extends ExpandableViewModel {
    ttl: number;
    dataStructure: RedisDataStructure;
    isActive: boolean;

    constructor(
        private redis: ReliableRedisClient,
        public name: string,
        public db: number) {
        super(TreeItemType.Key, name);
    }

    async loadDetailsAsync() {
        console.log('loading TTL..');
        this.ttl = await this.redis.ttlAsync(this.db, name);
        console.log(`TTL: ${this.ttl}`);

        this.dataStructure = await this.loadDataStructureAsync();
    }

    private loadDataStructureAsync(): ng.IPromise<RedisDataStructure> {
        return new Promise((resolve, reject) => {
            this.redis
                .typeAsync(this.db, this.name)
                .then(type => {
                    console.log(`type: ${type}`);
                    switch (type) {
                        case 'string':
                            this.redis
                                .getAsync(this.db, this.name)
                                .then(value => {
                                    console.log(value);
                                    return resolve(new RedisStringVM(value))
                                })
                                .error(err => console.log(err));
                            break;
                        case 'hash':
                            this.redis
                                .hgetallAsync(this.db, this.name)
                                .then(value => {
                                    console.log(value);
                                    return resolve(new RedisHashVM(value));
                                })
                                .error(err => console.log(err));
                            break;
                        case 'set':
                            this.redis
                                .smembersAsync(this.db, this.name)
                                .then(value => {
                                    console.log(value);
                                    return resolve(new RedisSetVM(value));
                                })
                                .error(err => console.log(err));
                            break;
                        case 'zset':
                            this.redis
                                .zrangeAsync(this.db, this.name)
                                .then(value => {
                                    console.log(value);
                                    return resolve(new RedisZSetVM(value));
                                })
                                .error(err => console.log(err));
                            break;
                        default:
                            break;
                    }
                });
        });
    }
}