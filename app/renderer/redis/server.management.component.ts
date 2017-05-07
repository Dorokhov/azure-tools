import { Component } from '@angular/core';
import { RedisServer } from './model/profile';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';

@Component({
  templateUrl: './redis/server.add.view.html'
})

export class RedisServerManagementComponent {
  currentServer: RedisServer;

  constructor(){
    let defaultServer = new RedisServer();
    defaultServer.host = '127.0.0.1'
    defaultServer.port = 6379;

    this.currentServer = defaultServer;
  }
}