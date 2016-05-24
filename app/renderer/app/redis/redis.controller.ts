
'use strict'

import {TreeViewModel} from './tree/treeViewModel';
import {RedisAccountViewModel} from './tree/redisAccountViewModel';
import {RedisKeyViewModel} from './tree/redisKeyViewModel';
import {ReliableRedisClient, RedisConnection, IRedisConnectionRepository} from './redis-model/reliableRedisClient';
import {RedisConnectionVM} from './viewModels/redisConnectionVM';
import IDialogService = angular.material.IDialogService;

export class RedisController {
    title: string = 'Redis';
    dialog: IDialogService = null;
    gridOptions: any;
    scope: any;
    treeViewModel: TreeViewModel = new TreeViewModel();
    $timeout: any;

    static $inject: Array<string> = ['$scope', '$timeout', '$log', '$mdDialog', '$q', 'RedisConnectionRepository'];
    constructor(
        $scope,
        $timeout,
        $log: ng.ILogService,
        $mdDialog: IDialogService,
        $q: ng.IQService,
        redisConnectionRepo: IRedisConnectionRepository) {
            
        this.scope = $scope;
        this.dialog = $mdDialog;
        this.$timeout = $timeout;

        var accounts = new Array<RedisAccountViewModel>();

        this.gridOptions = {
            data: this.treeViewModel.items,
            showHeader: false,
            columnDefs: [
                {
                    name: 'name',
                    field: 'name',
                    cellTemplate: '<div class="ui-grid-cell-contents"><button ng-click="row.entity.expandOrCollapse()" ng-bind="row.entity.isExpanded ? \'-\' : \'+\'"></button>{{row.entity[col.field]}}</div>'
                },
            ]
        };

        var connection = redisConnectionRepo.get();
        if (connection !== null) {
            this.loadAccounts(connection);
        }
    }

    showConnectionDialog(ev) {
        var self = this;
        self.dialog.show({
            templateUrl: `./app/redis/views/settingsView.html`,
            controller($scope, $mdDialog: IDialogService) {
                var vm = new RedisConnectionVM($mdDialog, (connection) => {
                    self.loadAccounts(connection);
                });
                $scope.vm = vm;
            }
        });
    };

    loadAccounts(connection: RedisConnection) {
        var redis = new ReliableRedisClient(connection);
        var account = new RedisAccountViewModel(this.$timeout, this.treeViewModel, connection, redis);
        this.treeViewModel.add(account);
    };
};