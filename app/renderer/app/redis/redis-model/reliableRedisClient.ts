'use strict'

import redis = require('redis');

export class ReliableRedisClient {
    private client: redis.RedisClient;
    private connection: RedisConnection;

    constructor(connection: RedisConnection) {
        this.connection = connection;
    }

    get(key: string, callback: (error: any, reply: any) => any): void {
        this.getClient().get(key, callback);
    }

    private getClient() {
        if (!this.client.connected) {
            this.client = redis.createClient(this.connection.port, this.connection.host, { auth_pass: this.connection.password });
        }

        return this.client;
    }
}

export class RedisConnection {
    constructor(public port: number, public host: string, public password: string) {

    }
}