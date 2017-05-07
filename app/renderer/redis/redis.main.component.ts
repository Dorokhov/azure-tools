import { Component, Inject } from '@angular/core';
import { Profile, RedisServer } from './model/profile';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './redis/redis.main.component.view.html'
})

export class RedisMainComponent {
  router: Router;
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  constructor(router: Router) {
  }
}