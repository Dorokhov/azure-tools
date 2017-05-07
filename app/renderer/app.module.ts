import { NgModule, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedisMainComponent } from './redis/redis.main.component';
import { RedisManagementComponent } from './redis/redis.management.component';
import { RedisServerManagementComponent } from './redis/server.management.component';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { } from '@angular/animations/browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MaterialModule } from '@angular/material';
import 'hammerjs';


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
    RouterModule.forRoot(appRoutes, { useHash: true }),
    MdButtonModule,
    MdCheckboxModule,
    MaterialModule
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
    router.events.subscribe((_) => {
      console.log(`current navigation state: ${router.url}`)
    });
  }
}