import { Component, Inject } from '@angular/core';
import { Profile, RedisServer } from './model/profile';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './redis/redis.main.component.view.html'
})

export class RedisMainComponent {
  router: Router;

  constructor(router: Router) {
  }
}