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
    defaultServer.host = '127.0.0.1'
    defaultServer.port = 6379;

    this.router = router;
    this.currentServer = defaultServer;
    this.currentProfile = this.userPreferencesRepository.getCurrentProfile();
  }

  connect() {
    let userPreferences = this.userPreferencesRepository.get();

    console.log(`user preferences ${userPreferences} and current profile ${this.currentProfile}`);
    
    if (userPreferences === null || this.currentProfile === null) {
      userPreferences = new UserPreferences();
      if(this.currentProfile === null){
        this.currentProfile = new Profile();
        this.currentProfile.servers.push(this.currentServer);
      }
      
      userPreferences.profiles.push(this.currentProfile);
      this.userPreferencesRepository.save(userPreferences);
    }
    else {
      let profile = _.find(userPreferences.profiles, x => x.name === this.currentProfile.name);
      profile.servers = this.currentProfile.servers;
      this.userPreferencesRepository.save(userPreferences);
    }

    this.router.navigate(['redis', this.currentServer]);
  }
}