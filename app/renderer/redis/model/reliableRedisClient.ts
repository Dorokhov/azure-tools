'use strict';
var redis = require('redis');
redis;
import bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class ReliableRedisClient {
    private client: redis.RedisClient;

    private port: number = 6379;
    private host: string = '127.0.0.1';
    private password: string = '';

    constructor() {
    }

    // getNumberOfKeysInDb(db: number): ng.IPromise<Array<any>> {
    //     this.$log.debug(db)
    //     var defer = this.$q.defer();
    //     this.newClient().multi().select(db).dbsize().execAsync().then(res => {
    //         res.push(db);
    //         defer.resolve(res);
    //     });
    //     return defer.promise;
    // }

    getAsync(db: number, key: string): Promise<string> {
        return this.tryingReuseConnection(db).getAsync(key);
    }

    // keysAsync(db: number): Promise<Array<string>> {
    //     return this.tryingReuseConnection(db).keysAsync('*');
    // }

    // typeAsync(db: number, key: string): Promise<string> {
    //     return this.tryingReuseConnection(db).typeAsync(key);
    // }

    // pttlAsync(db: number, key: string): Promise<number> {
    //     return this.tryingReuseConnection(db).pttlAsync(key);
    // }

    private tryingReuseConnection(db: number) {
        if (this.client === null || this.client === undefined || !this.client.connected) {
            this.client = redis.createClient(this.port, this.host, { auth_pass: this.password });
        }

        this.client.select(db);
        return this.client;
    }

    // private newClient() {
    //     this.client = redis.createClient(this.connection.port, this.connection.host, { auth_pass: this.connection.password });
    //     return this.client;
    // }
}

export class RedisConnection {
    constructor(public port: number, public host: string, public password: string) {

    }
}

export class RedisConnectionRepository implements IRedisConnectionRepository {
    get(): RedisConnection {
        return new RedisConnection(6379, 'redisdor.redis.cache.windows.net', 'ZaVlBh0AHJmw2r3PfWVKvm7X3FfC5fe+sMKJ93RueNY=');
    }
}

export interface IRedisConnectionRepository {
    get();
}