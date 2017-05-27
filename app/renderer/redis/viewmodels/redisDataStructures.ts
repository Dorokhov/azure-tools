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
export class KeyValue {
    constructor(public key: string, public value: string) {

    }
}

export class RedisHashVM extends RedisDataStructure {
    typeToDisplay: string;
    keyValues: KeyValue[] = [];

    constructor(public hash: object) {
        super();
        this.type = RedisTypes.Hash;
        this.typeToDisplay = RedisTypes[this.type];
        this.keyValues = _.map(hash, (value, prop)=>{
            return new KeyValue(value, prop);
        });
    }
}

export class RedisSetVM extends RedisDataStructure {
    typeToDisplay: string;
    keyValues: KeyValue[] = [];

    constructor(public values: string[]) {
        super();
        this.type = RedisTypes.Set;
        this.typeToDisplay = RedisTypes[this.type];
         this.keyValues = _.map(values, (value)=>{
            return new KeyValue(value, value);
        });
    }
}

export class RedisZSetVM extends RedisDataStructure {
    typeToDisplay: string;
    keyValues: KeyValue[] = [];

    constructor(public zset: object) {
        super();
        this.type = RedisTypes.ZSet;
        this.typeToDisplay = RedisTypes[this.type];
        this.keyValues = _.map(zset, (value, prop)=>{
            return new KeyValue(value, prop);
        });
    }
}