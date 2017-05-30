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

    private async loadDataStructureAsync() {
        let type = await this.redis.typeAsync(this.db, this.name);
        console.log(`type: ${type}`);
        let value = null;
        switch (type) {
            case 'string':
                value = await this.setBusy(this.redis.getAsync(this.db, this.name));
                console.log(value);
                return new RedisStringVM(value);
            case 'hash':
                value = await this.setBusy(this.redis.hgetallAsync(this.db, this.name));
                console.log(value);
                return new RedisHashVM(value);
            case 'set':
                value = await this.setBusy(this.redis.smembersAsync(this.db, this.name));
                return new RedisSetVM(value);
            case 'zset':
                value = await this.setBusy(this.redis.zrangeAsync(this.db, this.name));
                return new RedisZSetVM(value);
            default:
                break;
        }
    }
}