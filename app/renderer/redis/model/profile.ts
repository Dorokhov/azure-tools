import { RedisType } from './redisTypes';

export class Profile {
  name: string;
  servers: RedisServer[];
}

export class RedisServer{
  id: number;
  name: string;
  host: string;
  port: number;
  password: string;
  maxNumberToScanNotEmpty: number = 100;
  databases: RedisDatabase[];
}

export class RedisDatabase{
  number: number;
  name: string;
  keys: RedisKey[];
  separator: string;
}

export class RedisKey{
  name: string;
  type: RedisType;
}