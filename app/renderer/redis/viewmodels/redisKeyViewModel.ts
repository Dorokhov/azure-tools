import {IHierarchy} from './expandableViewModel';
import {RedisDataStructure, RedisStringVM} from './redisDataStructures';
//import {ReliableRedisClient, RedisConnection} from '../redis-model/reliableRedisClient';

export class RedisKeyViewModel implements IHierarchy {
    public ttl: number;
    public items: IHierarchy[] = new Array<IHierarchy>();
    public dataStructure: RedisDataStructure;

    constructor(
        public $log: ng.ILogService,
        public $timeout: any,
        protected $q: ng.IQService,
      //  public redis: ReliableRedisClient,
        public name: string,
        public db: number) { }

    loadDetails() {
        console.log('loading TTL..');
        // this.redis
        //     .pttlAsync(this.db, name)
        //     .then((data) => {
        //         this.$log.debug('TTL: ' + data);
        //         this.$timeout(() => {
        //             this.ttl = data
        //         });
        //     });

        this.loadDataStructureAsync()
            .then(ds => this.dataStructure = ds);
    }

    private loadDataStructureAsync(): ng.IPromise<RedisDataStructure> {        
        var deferred = this.$q.defer();
        // this.redis
        //     .typeAsync(this.db, this.name)
        //     .then(type => {
        //         switch (type) {
        //             case 'string':
        //                 this.redis
        //                     .getAsync(this.db, this.name)
        //                     .then(value => deferred.resolve(new RedisStringVM(value)));
        //                 break;
        //             default:
        //                 break;
        //         }
        //     });

        return deferred.promise;
    }
}