import { RedisTypes } from '../../redis/model/redisTypes';

export class RedisDataStructure {
    public type: RedisTypes;
}

export class RedisStringVM extends RedisDataStructure {
    typeToDisplay: string;

    constructor(public value: string) {
        super();
        this.type = RedisTypes.String;
        this.typeToDisplay = RedisTypes[this.type];
    }
}