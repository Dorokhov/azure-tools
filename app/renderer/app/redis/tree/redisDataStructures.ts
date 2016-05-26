'use strict'

import {RedisTypes} from '../redis-model/RedisTypes';

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