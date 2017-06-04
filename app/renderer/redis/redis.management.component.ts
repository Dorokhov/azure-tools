import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, RedisServer } from './model/profile';
import { UserPreferencesRepository } from './model/userPreferencesRepository';
import { KeyChangesEmitter } from './services/keychangesemitter';

@Component({
  templateUrl: './redis/redis.management.component.view.html',
  providers: [UserPreferencesRepository]
})

export class RedisManagementComponent {
  currentProfile: Profile;
  router: Router;

  buildVersion: number = 1;

  constructor(router: Router, userPreferencesRepository: UserPreferencesRepository) {
    this.router = router;

    // constantly increments counter and displays counter on the screen for dev purpose
    // that allows to see when watch has recompiled the app
    this.buildVersion = _.isNil(localStorage.getItem('buildVersion')) ? 3 : parseInt(localStorage.getItem('buildVersion'), 10);
    localStorage.setItem('buildVersion', (this.buildVersion + 1).toString());

    let currentProfile = userPreferencesRepository.getCurrentProfile()[1];
    if (currentProfile === null) {
      router.navigate(['management/server/add']);
    }
    else {
      router.navigate(['redis']);
    }
  }
}