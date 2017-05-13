import { Component, Inject } from '@angular/core';
import { Profile, RedisServer } from './model/profile';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeModel, TreeNode, TREE_ACTIONS } from 'angular2-tree-component';
import { ExpandableViewModel } from './viewmodels/expandableViewModel';
import { ReliableRedisClient } from './model/reliableRedisClient'
@Component({
  templateUrl: './redis/redis.main.component.view.html',
  providers: [ReliableRedisClient]
})

export class RedisMainComponent {
  router: Router;
  nodes: ExpandableViewModel[] = [];
  redis: ReliableRedisClient;

  onEvent = ($event) => console.log($event);
  onToggleExpanded = ($event) => {
    let node = $event.node;
    let vm = <ExpandableViewModel>node.data;
    vm.children.push(new ExpandableViewModel('test'));
    node.treeModel.update();
  };

  constructor(router: Router, private route: ActivatedRoute, redis: ReliableRedisClient) {
    this.redis = redis;

    let newServer = <RedisServer>route.params.value;

    let vm = new ExpandableViewModel();
    vm.name = newServer.host;
    this.nodes.push(vm);
  }
}