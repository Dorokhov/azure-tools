import { ReliableRedisClient } from '../model/reliableRedisClient';
import { DatabaseViewModel } from '../viewmodels/databaseViewModel';
import { ServerViewModel } from '../viewmodels/serverViewModel';
import { RedisKeyViewModel } from '../viewmodels/redisKeyViewModel';

export class ReliableRedisClientPool {

    private pool = {};

    constructor() {

    }

    public getClient(host: string, port: number, password: string): ReliableRedisClient {
        console.log(`get redis client from pool: host '${host}' port '${port}'`);
        let client = this.pool[host];
        if (_.isNil(client)) {
            console.log(`get redis client from pool: client not found in the pool by '${host}' host name`);
            client = new ReliableRedisClient(host, port, password);
            this.pool[host] = client;
        }

        console.log(`get redis client from pool: end`);
        console.log(client);
        return client;
    }

    public getClientFromKeyVm(keyVm: RedisKeyViewModel): ReliableRedisClient {
        return this.getClientFromDbVm(keyVm.db);
    }

    public getClientFromDbVm(dbVm: DatabaseViewModel): ReliableRedisClient {
        return this.getClientFromSeverVm(dbVm.serverVm);
    }

    public getClientFromSeverVm(serverVm: ServerViewModel): ReliableRedisClient {
        return this.getClient(serverVm.model.host, serverVm.model.port, serverVm.model.password);
    }
}