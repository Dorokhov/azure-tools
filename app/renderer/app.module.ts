import { NgModule,Inject }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedisManagementComponent } from './redis/redis.management.component';
import { RedisServerManagementComponent } from './redis/server.management.component';
import { RedisComponent } from './redis/redis.component';
import { RouterModule, Routes,Router,ROUTER_DIRECTIVES } from '@angular/router';

const appRoutes: Routes = [
  { path: 'redis-management', component: RedisManagementComponent },
  { path: 'management/server/add', component: RedisServerManagementComponent },
  { path: 'redis',      component: RedisComponent },
  { path: '**', component:RedisManagementComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
    ,
   RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    RedisManagementComponent,
    RedisServerManagementComponent,
    RedisComponent
  ],
  bootstrap: [ RedisManagementComponent ]
})
export class AppModule {
  constructor(router: Router){
    console.log('HAHA')
    console.log(router)
  }
}