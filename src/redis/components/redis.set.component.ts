import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RedisDataStructure } from '../viewModels/redisDataStructures';

@Component({
  templateUrl: './redis/components/redis.set.component.view.html',
  selector: 'redis-set',
  inputs: ['dataStructure']
})


export class RedisSetComponent {
  public dataStructure: RedisDataStructure;

  constructor() {  }
}