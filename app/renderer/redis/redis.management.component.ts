import { Component } from '@angular/core';
import { Profile, RedisServer } from './model/profile';
import { Router } from '@angular/router';

@Component({
  templateUrl: './redis/redis.management.component.view.html'
})

export class RedisManagementComponent {
  currentProfile: Profile;
  router: Router;

  constructor(router: Router) {
    let defaultProfile = new Profile();
    defaultProfile.name = 'Default';

    this.currentProfile = defaultProfile;
    this.router = router;

    router.navigate(['management/server/add']);
  }
}