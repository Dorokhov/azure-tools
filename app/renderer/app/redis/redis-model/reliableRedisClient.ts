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

    get(key: string, callback: (error: any, reply: any) => any): void {
        this.getClient().get(key, callback);
    }

    keysAsync(): Promise<Array<string>> {
        return this.getClient().keysAsync('*');
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