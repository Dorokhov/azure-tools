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

    getNumberOfKeysInDb(db: number): ng.IPromise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.newClient()
                .multi()
                .select(db)
                .dbsize()
                .execAsync()
                .then(res => {
                    res.push(db);
                    resolve(res);
                });
        });
    }

    getAsync(db: number, key: string): Promise<string> {
        return this.tryingReuseConnection(db).getAsync(key);
    }

    keysAsync(db: number): Promise<Array<string>> {
        return this.tryingReuseConnection(db).keysAsync('*');
    }

    typeAsync(db: number, key: string): Promise<string> {
        return this.tryingReuseConnection(db).typeAsync(key);
    }

    ttlAsync(db: number, key: string): Promise<number> {
        return this.tryingReuseConnection(db).ttlAsync(key);
    }

    private tryingReuseConnection(db: number) {
        if (this.client === null || this.client === undefined || !this.client.connected) {
            this.client = redis.createClient(this.port, this.host, { auth_pass: this.password });
        }

        this.client.select(db);
        return this.client;
    }

    private newClient() {
        this.client = redis.createClient(this.port, this.host, { auth_pass: this.password });
        return this.client;
    }
}