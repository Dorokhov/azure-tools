import { RedisDataStructure, RedisStringVM } from './redisDataStructures';
import { ReliableRedisClient } from '../model/reliableRedisClient'

export class RedisKeyViewModel {
    ttl: number;
    dataStructure: RedisDataStructure;
    isActive: boolean;

    constructor(
        private redis: ReliableRedisClient,
        public name: string,
        public db: number) { }

    loadDetails() {
        console.log('loading TTL..');
        this.redis
            .pttlAsync(this.db, name)
            .then((data) => {
                console.log('TTL: ' + data);
                this.ttl = data;
            });

        this.loadDataStructureAsync()
            .then(ds => this.dataStructure = ds);
    }

    private loadDataStructureAsync(): ng.IPromise<RedisDataStructure> {

        return new Promise((resolve, reject) => {
            this.redis
                .typeAsync(this.db, this.name)
                .then(type => {
                    switch (type) {
                        case 'string':

                            this.redis
                                .getAsync(this.db, this.name)
                                .then(value => resolve(new RedisStringVM(value)));
                            break;
                        default:
                            break;
                    }
                });
        });
    }
}