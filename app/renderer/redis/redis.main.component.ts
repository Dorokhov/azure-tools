import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeModel, TreeNode, TREE_ACTIONS } from 'angular2-tree-component';

import { Profile, RedisServer, RedisDatabase } from './model/profile';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './viewmodels/expandableViewModel';
import { RedisKeyViewModel } from './viewmodels/redisKeyViewModel';
import { ReliableRedisClient } from './model/reliableRedisClient';
import { UserPreferencesRepository } from './model/userPreferencesRepository';

@Component({
  templateUrl: './redis/redis.main.component.view.html',
  providers: [ReliableRedisClient, UserPreferencesRepository]
})


export class RedisMainComponent {
  private ngZone: NgZone;
  private route: ActivatedRoute;
  private userPreferencesRepository: UserPreferencesRepository;
  private currentProfile: Profile;

  router: Router;
  nodes: ExpandableViewModel[] = [];
  redis: ReliableRedisClient;
  keyVmList: RedisKeyViewModel[] = [];

  constructor(
    router: Router,
    route: ActivatedRoute,
    redis: ReliableRedisClient,
    ngZone: NgZone,
    userPreferencesRepository: UserPreferencesRepository) {
    this.redis = redis;
    this.ngZone = ngZone;
    this.route = route;
    this.userPreferencesRepository = userPreferencesRepository;

    let currentProfile = this.userPreferencesRepository.getCurrentProfile();
    this.currentProfile = currentProfile;

    let newServer = <RedisServer>route.params.value;

    this.nodes = _.map(this.currentProfile.servers, server => new ExpandableViewModel(TreeItemType.Server, server.host));
  }

  onSelectedKeyVmChanged = ($event: any): void => {
    console.log('event => ', $event);
    console.log('index => ', $event.index);
  }

  onEvent = ($event) => console.log($event);
  onToggleExpanded = ($event) => {
    this.getSubItems($event.node);
  };

  private async getSubItems(node: any) {
    let vm = <ExpandableViewModel>node.data;
    switch (vm.type) {
      case TreeItemType.Server:
        this.getServerSubItems(node, vm);
        break;

      case TreeItemType.Database:
        this.getDatabaseSubItems(node, vm);
        break;

      case TreeItemType.Key:
        let keyVm = new RedisKeyViewModel(this.redis, vm.name, 0);
        keyVm.isActive = false;
        this.keyVmList.push(keyVm);
        break;
    }
  }

  private getServerSubItems(node: any, vm: ExpandableViewModel) {
    vm.children.length = 0;
    _.map(_.range(0, 10 + 1, 1), each => {
      let db = new RedisDatabase();
      db.name = each.toString();
      db.number = each;
      vm.children.push(new ExpandableViewModelGeneric<RedisDatabase>(db, TreeItemType.Database, db.name))
    });
    node.treeModel.update();
  }

  private async getDatabaseSubItems(node: any, vm: ExpandableViewModel) {
    let db = <ExpandableViewModelGeneric<RedisDatabase>>vm;
    let keys = await this.redis.keysAsync(db.model.number);
    vm.children.length = 0;
    _.map(keys, key => {
      db.children.push(new ExpandableViewModel(TreeItemType.Key, key));
    });

    this.ngZone.run(() => { node.treeModel.update(); });
  }
}