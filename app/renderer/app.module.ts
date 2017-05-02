import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedisManagementComponent } from './redis/redis.management.component';
import { RedisComponent } from './redis/redis.component';
import { RouterModule, Routes,Router } from '@angular/router';

const appRoutes: Routes = [
  { path: 'redis-management', component: RedisManagementComponent },
  { path: 'redis',      component: RedisComponent },
  { path: '**', component:RedisManagementComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    RedisManagementComponent,
    RedisComponent
  ],
  bootstrap: [ RedisManagementComponent ]
})

export class AppModule {
}