import { Component, NgZone } from '@angular/core';
import { Profile, RedisServer, RedisDatabase } from './model/profile';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeModel, TreeNode, TREE_ACTIONS } from 'angular2-tree-component';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './viewmodels/expandableViewModel';
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
    this.getSubItems($event.node);
  };

  constructor(router: Router, private route: ActivatedRoute, redis: ReliableRedisClient, private _ngZone: NgZone) {
    this.redis = redis;

    let newServer = <RedisServer>route.params.value;

    let vm = new ExpandableViewModel(TreeItemType.Server, newServer.host);
    this.nodes.push(vm);
  }

  private async getSubItems(node: any) {
    let vm = <ExpandableViewModel>node.data;
    switch (vm.type) {
      case TreeItemType.Server:
        this.getServerSubItems(node, vm);
        break;

      case TreeItemType.Database:
        this.getDatabaseSubItems(node, vm);
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

    this._ngZone.run(() => { node.treeModel.update(); });
  }
}