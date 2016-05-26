'use strict'

import redis = require('redis');
import bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class ReliableRedisClient {
    private client: redis.RedisClient;
    private connection: RedisConnection;

    constructor(connection: RedisConnection) {
        this.connection = connection;
    }

    getAsync(key: string): Promise<string> {
        return this.getClient().getAsync(key);
    }

    keysAsync(): Promise<Array<string>> {
        return this.getClient().keysAsync('*');
    }
    
    typeAsync(key: string): Promise<string> {
        return this.getClient().typeAsync(key);
    }
    
    pttlAsync(key: string): Promise<number> {
        return this.getClient().pttlAsync(key);
    }

    private getClient() {
        if (this.client === null || this.client === undefined || !this.client.connected) {
            this.client = redis.createClient(this.connection.port, this.connection.host, { auth_pass: this.connection.password });
        }

        return this.client;
    }
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

export interface IRedisConnectionRepository{
    get();
}