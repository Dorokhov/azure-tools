'use strict';
var redis = require('redis');
redis;
import bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class ReliableRedisClient {
    private client: redis.RedisClient;

    private port: number = 6379;
    private host: string = '';
    private password: string = '';

    constructor(host: string, port: number, password: string) {
        this.host = host;
        this.port = port;
        this.password = password;
    }

    getNumberOfKeysInDb(db: number): ng.IPromise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.newClient()
                .multi()
                .select(db)
                .dbsize()
                .execAsync()
                .then(result => {
                    result.push(db);
                    resolve(result);
                });
        });
    }

    searchKeysAsync(db: number, keyPattern: string): Promise<string[]> {
        return this.tryingReuseConnection(db).keysAsync(keyPattern);
    }

    getAsync(db: number, key: string): Promise<string> {
        return this.tryingReuseConnection(db).getAsync(key);
    }

    hgetallAsync(db: number, key: string): Promise<object[]> {
        return this.tryingReuseConnection(db).hgetallAsync(key);
    }

    smembersAsync(db: number, key: string): Promise<string[]> {
        return this.tryingReuseConnection(db).smembersAsync(key);
    }

    zrangeAsync(db: number, key: string): Promise<object[]> {
        return this.tryingReuseConnection(db).zrangeAsync(key, 0, -1, 'withscores');
    }

    keysAsync(db: number): Promise<string[]> {
        console.log(`reliable redis client: keysAsync called`)
        return this.tryingReuseConnection(db).keysAsync('*');
    }

    delAsync(db: number, key: string): Promise<string[]> {
        return this.tryingReuseConnection(db).delAsync(key);
    }

    del(db: number, key: string): void {
        return this.tryingReuseConnection(db).del(key);
    }

    typeAsync(db: number, key: string): Promise<string> {
        return this.tryingReuseConnection(db).typeAsync(key);
    }

    ttlAsync(db: number, key: string): Promise<number> {
        return this.tryingReuseConnection(db).ttlAsync(key);
    }

    setAsync(db: number, key: string, value: string): Promise<void> {
        return this.tryingReuseConnection(db).setAsync(key, value);
    }

    saddAsync(db: number, key: string, value: string): Promise<void> {
        return this.tryingReuseConnection(db).saddAsync(key, value);
    }

    zaddAsync(db: number, key: string, score: number, value: string): Promise<void> {
        return this.tryingReuseConnection(db).zaddAsync(key, score, value);
    }

    hsetAsync(db: number, key: string, field: string, value: string): Promise<void> {
        return this.tryingReuseConnection(db).hsetAsync(key, field, value);
    }

    expireAsync(db: number, key: string, ttl: number): Promise<void> {
        return this.tryingReuseConnection(db).expireAsync(key, ttl);
    }

    private tryingReuseConnection(db: number) {
        if (this.client === null || this.client === undefined || !this.client.connected) {

            this.client = redis.createClient(this.port, this.host, this.getSecurity());
        }

        this.client.select(db);
        console.log(`reliable redis client: client with '${this.host}' host and '${this.port}' port being used`);
        console.log(this.client);
        return this.client;
    }

    private newClient() {
        this.client = redis.createClient(this.port, this.host, this.getSecurity());
        return this.client;
    }

    private getSecurity() {
        let security = { auth_pass: this.password };
        if (this.port === 6380) {
            security['tls'] = { servername: this.host };
            console.log('reliable redis client: added TLS');
            console.log(security);
        }

        return security;
    }
}