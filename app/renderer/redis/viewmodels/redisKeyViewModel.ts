import { RedisDataStructure, RedisStringVM } from './redisDataStructures';
import { ReliableRedisClient } from '../model/reliableRedisClient'

export class RedisKeyViewModel {
    ttl: number;
    dataStructure: RedisDataStructure;
    isActive: boolean;

    constructor(
        private redis: ReliableRedisClient,
        public name: string,
        public db: number) {

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
                    console.log(`Type: ${type}`);
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