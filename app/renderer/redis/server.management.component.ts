import { Component } from '@angular/core';
import { RedisServer } from './model/profile';
import { Router } from '@angular/router';

@Component({
   templateUrl: './redis/server.management.component.view.html'
})

export class RedisServerManagementComponent {
  currentServer: RedisServer;
  router: Router; 

  constructor(router: Router) {
    let defaultServer = new RedisServer();
    defaultServer.host = '127.0.0.1'
    defaultServer.port = 6379;

    this.router = router;
    this.currentServer = defaultServer;
  }
 
  connect() {
    this.router.navigate(['redis', this.currentServer]);
  }
}