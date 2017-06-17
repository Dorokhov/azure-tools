import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, RedisServer } from './model/profile';
import { UserPreferences } from './model/userPreferences';
import { UserPreferencesRepository } from './model/userPreferencesRepository';
var electron = System._nodeRequire('electron');
electron;

@Component({
  templateUrl: './redis/server.management.component.view.html',
  providers: [UserPreferencesRepository]
})

export class RedisServerManagementComponent {
  currentServer: RedisServer;
  router: Router;
  userPreferencesRepository: UserPreferencesRepository;
  currentProfile: Profile;
  public isSsl: boolean = false;
  public errorMessages: string[] = [];
  private azureLabel = 'Microsoft Azure';
  private standaloneLabel = 'Standalone'
  selectedTab: string;
  public shell;

  constructor(router: Router, userPreferencesRepository: UserPreferencesRepository) {
    this.userPreferencesRepository = userPreferencesRepository;

    let defaultServer = new RedisServer();
    defaultServer.host = '';

    this.router = router;
    this.currentServer = defaultServer;
    this.currentProfile = null;
    var tuple = this.userPreferencesRepository.getCurrentProfile();
    if (tuple !== null) {
      this.currentProfile = tuple[1];
    }

    this.selectedTab = this.azureLabel;
    this.shell = electron.shell;
  }

  public openExternal(url: string) {
    this.shell.openExternal(url);
  }

  public onSelectedConnectionTypeChanged($event) {
    console.log(`connection changed: following event`);
    console.log($event);

    this.selectedTab = $event.tab.textLabel;
    if ($event.tab.textLabel === this.standaloneLabel) {
      this.currentServer.host = '127.0.0.1';
    }
    else {
      this.currentServer.host = '';
    }
  }

  public sslChange($event) {
    this.isSsl = $event.checked;
  }

  connect() {
    if (!this.validate()) return;

    if (this.selectedTab === this.azureLabel) {
      this.currentServer.port = this.isSsl ? 6380 : 6379;
      this.currentServer.host += '.redis.cache.windows.net';
    }

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

  private validate(): boolean {
    this.errorMessages.length = 0;
    if (_.isEmpty(this.currentServer.host)) {
      this.errorMessages.push(`'Host' is required`);
      return false;
    }

    return true;
  }
}