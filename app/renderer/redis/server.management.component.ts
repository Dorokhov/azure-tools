import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, RedisServer } from './model/profile';
import { UserPreferences } from './model/userPreferences';
import { UserPreferencesRepository } from './model/userPreferencesRepository';

@Component({
  templateUrl: './redis/server.management.component.view.html',
  providers: [UserPreferencesRepository]
})

export class RedisServerManagementComponent {
  currentServer: RedisServer;
  router: Router;
  userPreferencesRepository: UserPreferencesRepository;
  currentProfile: Profile;

  constructor(router: Router, userPreferencesRepository: UserPreferencesRepository) {
    this.userPreferencesRepository = userPreferencesRepository;

    let defaultServer = new RedisServer();
    defaultServer.host = '127.0.0.1';

    this.router = router;
    this.currentServer = defaultServer;
    this.currentProfile = this.userPreferencesRepository.getCurrentProfile()[1];
  }

  connect() {
    let userPreferences = this.userPreferencesRepository.get();

    console.log(`user preferences ${userPreferences} and current profile ${this.currentProfile}`);

    if (userPreferences === null || this.currentProfile === null) {
      console.log('create new user preferences');
      userPreferences = new UserPreferences();
      if (this.currentProfile === null) {
        this.currentProfile = new Profile();
        this.currentProfile.servers.push(this.currentServer);
      }

      userPreferences.profiles.push(this.currentProfile);
      this.userPreferencesRepository.save(userPreferences);
    }
    else {
      console.log('update existing user preferences');
      let profile = _.find(userPreferences.profiles, x => x.name === this.currentProfile.name);
      this.currentProfile.servers.push(this.currentServer);
      profile.servers = this.currentProfile.servers;
      this.userPreferencesRepository.save(userPreferences);
    }

    console.log('server created: navigating to main component. navigation parameters');
    console.log(this.currentServer)
    this.router.navigate(['redis', this.currentServer]);
  }

  cancel() {
    console.log('server create: cancelled')
    this.router.navigate(['redis']);
  }
}