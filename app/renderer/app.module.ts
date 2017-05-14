import 'hammerjs';
import "lodash";
import "ng2-mobx";
import "mobx";

import { trigger, state, style, transition, animate } from '@angular/animations';
import { } from '@angular/animations/browser';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Angular2FontawesomeModule } from 'angular2-fontawesome'
import { TreeModule } from 'angular2-tree-component';

import { RedisMainComponent } from './redis/redis.main.component';
import { RedisManagementComponent } from './redis/redis.management.component';
import { RedisServerManagementComponent } from './redis/server.management.component';

import { readFile } from '@node/fs'
readFile;
import redis from 'redis';
redis;
import bluebird from 'bluebird';
bluebird;
import { ReliableRedisClient } from './redis/model/reliableRedisClient';



const appRoutes: Routes = [
  { path: 'redis-management', component: RedisManagementComponent },
  { path: 'management/server/add', component: RedisServerManagementComponent },
  { path: 'redis', component: RedisMainComponent },
  { path: '**', component: RedisManagementComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    TreeModule,
    FlexLayoutModule,
    Angular2FontawesomeModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [
    RedisManagementComponent,
    RedisServerManagementComponent,
    RedisMainComponent
  ],
  bootstrap: [RedisManagementComponent]
})

export class AppModule {
  constructor(router: Router) {
    router.events.subscribe((val) => {
      console.log(`current navigation state: ${router.url}`)
    });
  }
}