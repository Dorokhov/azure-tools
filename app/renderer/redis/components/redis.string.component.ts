import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RedisDataStructure } from '../viewModels/redisDataStructures';

@Component({
  templateUrl: './redis/components/redis.string.component.view.html',
  selector: 'redis-string',
  inputs: ['dataStructure']
})


export class RedisStringComponent {
  public dataStructure: RedisDataStructure;

  constructor() {  }
}