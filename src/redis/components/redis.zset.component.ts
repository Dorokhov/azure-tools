import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RedisDataStructure } from '../viewModels/redisDataStructures';

@Component({
  templateUrl: './redis/components/redis.zset.component.view.html',
  selector: 'redis-zset',
  inputs: ['dataStructure']
})


export class RedisZSetComponent {
  public dataStructure: RedisDataStructure;

  constructor() {  }
}