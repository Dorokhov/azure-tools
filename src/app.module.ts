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
import { MaterialModule, MdDialog, MdDialogRef } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Angular2FontawesomeModule } from 'angular2-fontawesome'
import { TreeModule } from '../node_modules/angular2-tree-component/dist/angular-tree-component';

import { RedisStringComponent } from './redis/components/redis.string.component';
import { RedisHashComponent } from './redis/components/redis.hash.component';
import { RedisSetComponent } from './redis/components/redis.set.component';
import { RedisZSetComponent } from './redis/components/redis.zset.component';
import { ServerDetailsComponent } from './redis/components/server.details.component';
import { DatabaseDetailsComponent } from './redis/components/database.details.component';
import { KeyDetailsComponent } from './redis/components/key.details.component';
import { CreateKeyDialogComponent } from './redis/components/create.key.component';
import { ConfirmDialogComponent } from './redis/components/confirm.component';
import { ChangeTtlDialogComponent } from './redis/components/change.ttl.component';

import { RedisMainComponent } from './redis/redis.main.component';
import { RedisManagementComponent } from './redis/redis.management.component';
import { RedisServerManagementComponent } from './redis/server.management.component';
import { SplitPaneModule } from 'ng2-split-pane';
import { TreeTableModule,TreeNode,DataTableModule, SharedModule } from 'primeng';

import { readFile } from '@node/fs'
readFile;
import redis from 'redis';
redis;
import bluebird from 'bluebird';
bluebird;
import { ReliableRedisClient } from './redis/model/reliableRedisClient';
import { ReliableRedisClientPool } from './redis/services/reliableRedisClientPool';

import { KeyChangesEmitter } from './redis/services/keychangesemitter';

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
    // MdDialog, 
    //MdDialogRef,
    FormsModule,
    HttpModule,
    TreeModule,
    FlexLayoutModule,
    SplitPaneModule,
    Angular2FontawesomeModule,

    TreeTableModule,
    DataTableModule,
    SharedModule,
    //CreateKeyDialogComponent,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [
    RedisManagementComponent,
    RedisServerManagementComponent,
    RedisMainComponent,

    RedisStringComponent,
    RedisHashComponent,
    RedisSetComponent,
    RedisZSetComponent,
    ServerDetailsComponent,
    DatabaseDetailsComponent,
    KeyDetailsComponent,

    CreateKeyDialogComponent,
    ConfirmDialogComponent,
    ChangeTtlDialogComponent
  ],
  entryComponents: [CreateKeyDialogComponent, ConfirmDialogComponent,ChangeTtlDialogComponent],
  providers: [KeyChangesEmitter],
  bootstrap: [RedisManagementComponent]
})

export class AppModule {
  constructor(router: Router) {
    router.events.subscribe((val) => {
      console.log(`current navigation state: ${router.url}`)
    });
  }
}