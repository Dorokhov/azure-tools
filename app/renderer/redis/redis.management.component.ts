import { Component, Inject } from '@angular/core';
import { Profile, RedisServer } from './model/profile';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './redis/redis.management.view.html'
})

export class RedisManagementComponent {
  currentProfile: Profile;

  constructor(router: Router){
    let defaultProfile = new Profile();
    defaultProfile.name = 'Default';

    this.currentProfile = defaultProfile;

    router.navigate(['management/server/add']);
  }
}