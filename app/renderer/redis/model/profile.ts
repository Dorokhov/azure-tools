import { RedisType } from './redisTypes';

export class Profile {
  name: string;
  servers: RedisServer[] = [];
}

export class RedisServer {
  id: number;
  name: string = '';
  host: string = '';
  port: number = 6379;
  password: string = '';
  maxNumberToScanNotEmpty: number = 100;
  databases: RedisDatabase[] = [];
  constructor() {

  }
  public equals(other: RedisServer): boolean {
    if (_.isNil(other)) {
      return false;
    }

    return this.host === other.host;
  }
}

export class RedisDatabase {
  number: number;
  name: string;
  keys: RedisKey[] = [];
  separator: string;
}

export class RedisKey {
  name: string;
  type: RedisType;
}