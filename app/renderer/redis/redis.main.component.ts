import { Component, ViewChild, NgZone, ElementRef, Renderer2, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TreeModel, TreeNode, TREE_ACTIONS } from 'angular2-tree-component';

import { Profile, RedisServer, RedisDatabase } from './model/profile';
import { RedisTypes } from './model/redisTypes';
import { ExpandableViewModel, ExpandableViewModelGeneric, TreeItemType } from './viewmodels/expandableViewModel';
import { ServerViewModel } from './viewmodels/serverViewModel';
import { DatabaseViewModel } from './viewmodels/databaseViewModel';

import { RedisFolderViewModel } from './viewmodels/redisFolderViewModel';
import { RedisKeyViewModel } from './viewmodels/redisKeyViewModel';
import { ReliableRedisClient } from './model/reliableRedisClient';
import { ReliableRedisClientPool } from './services/reliableRedisClientPool';
import { UserPreferencesRepository } from './model/userPreferencesRepository';
import { KeyChangesEmitter } from './services/keychangesemitter';


var electron = System._nodeRequire('electron');
electron;

@Component({
  templateUrl: './redis/redis.main.component.view.html',
  providers: [ReliableRedisClientPool, UserPreferencesRepository],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class RedisMainComponent implements AfterViewInit {
  private ngZone: NgZone;
  private route: ActivatedRoute;
  private userPreferencesRepository: UserPreferencesRepository;
  private currentProfile: Profile;
  private router: Router;

  public nodes: ExpandableViewModel[] = [];
  private redisClientPool: ReliableRedisClientPool;
  keyVmList: RedisKeyViewModel[] = [];
  selectedKeyVm: RedisKeyViewModel = null;
  selectedKeyVmIndex: number;
  JSON: object;
  _: object;
  TreeItemType: object;
  options: object = {
    useVirtualScroll: false,
    nodeHeight: 15,
    dropSlotHeight: 2,
    allowDrag: false,
    animateExpand: false,
    idField: 'id',
  };

  public selectedTreeViewModel: ExpandableViewModel = null;
  public searchPattern = 'Key:4';
  public shell;

  counter: number = 0;
  private idProvider = () => {
    this.counter++;
    return this.counter;
  }

  @ViewChild('tree') tree: ElementRef;
  constructor(
    router: Router,
    route: ActivatedRoute,
    redisClientPool: ReliableRedisClientPool,
    ngZone: NgZone,
    userPreferencesRepository: UserPreferencesRepository,
    private rd: Renderer2,
    private dialog: MdDialog,
    private keyChangesEmitter: KeyChangesEmitter) {
    this.redisClientPool = redisClientPool;
    this.router = router;
    this.ngZone = ngZone;
    this.route = route;
    this.userPreferencesRepository = userPreferencesRepository;
    this.JSON = JSON;
    this._ = _;
    this.TreeItemType = TreeItemType;

    let currentProfile = this.userPreferencesRepository.getCurrentProfile();
    this.currentProfile = currentProfile[1];

    let newServer = <RedisServer>route.params.value;

    keyChangesEmitter.keyDeleted$.subscribe(keyVm => {
      console.log(`removing key tabs: ${keyVm.name}`);
      if (this.selectedKeyVm.equals(keyVm)) {
        this.selectedKeyVm = null;
        this.selectedKeyVmIndex = -1;
      }
      _.remove(this.keyVmList, each => each.equals(keyVm));
    });

    keyChangesEmitter.serverDeleted$.subscribe(serverVm => {
      console.log(`delete server: removing server from UI`);
      console.log(`delete server: number of servers before delete equals to ${this.nodes.length}`);
      _.remove(this.nodes, each => (<ServerViewModel>each).equals(serverVm));
      console.log(`delete server: number of servers after delete equals to ${this.nodes.length}`);
      this.tree.treeModel.update();
      console.log('delete server: tree updated')
    });

    this.shell = electron.shell;
  }

  ngAfterViewInit() {
    console.log('main component: view init');
    console.log(this.tree.treeModel);
    this.nodes = _.map(this.currentProfile.servers, server => new ServerViewModel(this.currentProfile, server, this.redisClientPool, this.ngZone, this.tree.treeModel, this.idProvider, this.dialog, this.keyChangesEmitter));
  }

  public openExternal(url: string) {
    this.shell.openExternal(url);
  }

  public addServer() {
    this.router.navigate(['management/server/add']);
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

  public changeExpanded(node) {
    this.selectedTreeViewModel = <ExpandableViewModel>node.data;
    this.selectedTreeViewModel.isExpanded = !this.selectedTreeViewModel.isExpanded;
    if (this.selectedTreeViewModel.isExpanded) {
      console.log('tree selection: selection changed');
      console.log(this.selectedTreeViewModel);
      this.getSubItems(node);
    }
    else {
      if (node.type == TreeItemType.Server) {
        this.searchPattern = '';
      }

      this.selectedTreeViewModel = null;
      // node.data.children.length = 0;
      node.collapse();
    }
  }

  onSelectedKeyVmChanged = ($event: any): void => {
    console.log(`user selects tab: ${$event.index}`);
    this.displayKey(this.keyVmList[$event.index]);
  }

  onActivate = ($event) => {
    let vm = <ExpandableViewModel>$event.node.data;
    console.log(`user selects: getting subitems for type: ${TreeItemType[vm.type]}`);
    this.selectedTreeViewModel = vm;
    switch (vm.type) {
      case TreeItemType.Key:
        this.displayKey(<RedisKeyViewModel>vm);
        break;
    }
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
      case TreeItemType.Folder:
        let folderVm = <RedisFolderViewModel>vm;
        folderVm.displaySubItems(node);
        break;
      case TreeItemType.Key:
        this.displayKey(<RedisKeyViewModel>vm);
        break;
    }
  }

  private displayKey(vm: RedisKeyViewModel) {
    if (_.some(this.keyVmList, x => x.equals(vm))) {
      this.selectedKeyVmIndex = _.indexOf(this.keyVmList, _.find(this.keyVmList, x => x.equals(vm)));
      this.selectedKeyVm = _.find(this.keyVmList, x => x.equals(vm));
      return;
    }

    this.replaceKeyVm(vm);
  }

  private replaceKeyVm(keyVm: RedisKeyViewModel) {
    this.keyVmList.length = 0;
    this.addKeyVm(keyVm);
  }

  private addKeyVm(keyVm: RedisKeyViewModel) {
    if (_.isNil(keyVm)) {
      console.log(`key not added, because it's nil`);
      return;
    }

    _.forEach(this.keyVmList, each => each.isActive = false);
    keyVm.isActive = true;
    keyVm.loadDetailsAsync();

    this.selectedKeyVmIndex = this.keyVmList.length;
    this.selectedKeyVm = keyVm;
    console.log(`selected Key ${this.selectedKeyVmIndex}`)

    this.ngZone.run(() => this.keyVmList.push(keyVm));
  }
}