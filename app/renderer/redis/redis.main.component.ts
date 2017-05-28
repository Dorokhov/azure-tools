import { Component, ViewChild, NgZone, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeModel, TreeNode, TREE_ACTIONS } from 'angular2-tree-component';

import { Profile, RedisServer, RedisDatabase } from './model/profile';
import { RedisTypes } from './model/redisTypes';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './viewmodels/expandableViewModel';
import { ServerViewModel } from './viewmodels/serverViewModel';
import { DatabaseViewModel } from './viewmodels/databaseViewModel';

import { RedisKeyViewModel } from './viewmodels/redisKeyViewModel';
import { ReliableRedisClient } from './model/reliableRedisClient';
import { UserPreferencesRepository } from './model/userPreferencesRepository';


@Component({
  templateUrl: './redis/redis.main.component.view.html',
  providers: [ReliableRedisClient, UserPreferencesRepository]
})


export class RedisMainComponent implements AfterViewInit {
  private ngZone: NgZone;
  private route: ActivatedRoute;
  private userPreferencesRepository: UserPreferencesRepository;
  private currentProfile: Profile;

  router: Router;
  public nodes: ExpandableViewModel[] = [];
  redis: ReliableRedisClient;
  keyVmList: RedisKeyViewModel[] = [];
  selectedKeyVm: RedisKeyViewModel = null;
  selectedKeyVmIndex: number;
  JSON: object;
  _: object;
  TreeItemType: object;
  options: object = {
    useVirtualScroll: true,
    nodeHeight: (node: TreeNode) => 17,
    dropSlotHeight: 0
  };

  public selectedTreeViewModel: ExpandableViewModel = null;
  public searchPattern = 'Key:4';

  counter: number = 0;
  private idProvider = () => {
    this.counter++;
    return this.counter;
  }

  @ViewChild('tree') tree: ElementRef;
  constructor(
    router: Router,
    route: ActivatedRoute,
    redis: ReliableRedisClient,
    ngZone: NgZone,
    userPreferencesRepository: UserPreferencesRepository,
    private rd: Renderer2) {
    this.redis = redis;
    this.ngZone = ngZone;
    this.route = route;
    this.userPreferencesRepository = userPreferencesRepository;
    this.JSON = JSON;
    this._ = _;
    this.TreeItemType = TreeItemType;

    let currentProfile = this.userPreferencesRepository.getCurrentProfile();
    this.currentProfile = currentProfile;

    let newServer = <RedisServer>route.params.value;

  }

  ngAfterViewInit() {
    console.log('main component: view init');
    console.log(this.tree.treeModel);
    this.nodes = _.map(this.currentProfile.servers, server => new ServerViewModel(server, this.redis, this.ngZone, this.tree.treeModel, this.idProvider));
  }

  public async search() {
    console.log(`search: searching by '${this.searchPattern}' pattern`);
    var servers = this.nodes;
    console.log(`search: servers to search in`);
    console.log(servers);
    for (var server of servers) {
      await (<ServerViewModel>server).search(this.searchPattern);
    };

    console.log('search: search finished');
  }

  onSelectedKeyVmChanged = ($event: any): void => {
    this.selectedKeyVm = this.keyVmList[$event.index];
  }

  onEvent = ($event) => console.log($event);
  onToggleExpanded = ($event) => {
    // this.getSubItems($event.node);
  };

  onActivate = ($event) => {
    this.selectedTreeViewModel = <ExpandableViewModel>$event.node.data;
    console.log('tree selection: selection changed');
    console.log(this.selectedTreeViewModel);
    this.getSubItems($event.node);
  };

  onDeactivate = ($event) => {
    if ($event.node.type == TreeItemType.Server) {
      this.searchPattern = '';
    }

    this.selectedTreeViewModel = null;

    $event.node.data.isExpanded = false;
    $event.node.data.children.length = 0;
    $event.node.collapse();
  };

  private async getSubItems(node: any) {
    let vm = <ExpandableViewModel>node.data;
    console.log(`user expands: getting subitems for type: ${TreeItemType[vm.type]}`)
    switch (vm.type) {
      case TreeItemType.Server:
        let server = <ServerViewModel>vm;
        server.displaySubItems(node);
        break;
      case TreeItemType.Database:
        let db = <DatabaseViewModel>vm;
        db.displaySubItems(node);
        break;
      case TreeItemType.Key:
        this.displayKey(vm);
        break;
    }
  }

  private displayKey(vm: ExpandableViewModel) {
    if (_.some(this.keyVmList, x => x.name === vm.name)) {
      this.selectedKeyVmIndex = _.indexOf(this.keyVmList, _.find(this.keyVmList, x => x.name === vm.name));
      return;
    }

    let keyVm = new RedisKeyViewModel(this.redis, vm.name, 0);
    _.forEach(this.keyVmList, each => each.isActive = false);
    keyVm.isActive = true;
    keyVm.loadDetailsAsync();

    this.selectedKeyVmIndex = this.keyVmList.length;
    console.log(`selected Key ${this.selectedKeyVmIndex}`)

    this.ngZone.run(() => this.keyVmList.push(keyVm));
  }
}