import { NgModule, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedisManagementComponent } from './redis/redis.management.component';
import { RedisServerManagementComponent } from './redis/server.management.component';
import { RedisComponent } from './redis/redis.component';
import { RouterModule, Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations'
import {} from '@angular/animations/browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule,MaterialModule} from '@angular/material';
import 'hammerjs';

const appRoutes: Routes = [
  { path: 'redis-management', component: RedisManagementComponent },
  { path: 'management/server/add', component: RedisServerManagementComponent },
  { path: 'redis', component: RedisComponent },
  { path: '**', component: RedisManagementComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MdButtonModule, 
    MdCheckboxModule,
    MaterialModule
  ],
  declarations: [
    RedisManagementComponent,
    RedisServerManagementComponent,
    RedisComponent
  ],
  bootstrap: [RedisManagementComponent]
})
export class AppModule {
  constructor(router: Router) {
  }
}