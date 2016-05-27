'use strict'
export module settings {
    export function getUserSettings() {
        return new RedisModuleSettings();
    }
}

export class RedisModuleSettings{
    public numberOfDatabaseToScan : number = 10;
}