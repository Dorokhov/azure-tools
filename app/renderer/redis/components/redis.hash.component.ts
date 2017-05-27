import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RedisDataStructure } from '../viewModels/redisDataStructures';

@Component({
  templateUrl: './redis/components/redis.hash.component.view.html',
  selector: 'redis-hash',
  inputs: ['dataStructure']
})


export class RedisHashComponent {
  public dataStructure: RedisDataStructure;

  constructor() {  }
}