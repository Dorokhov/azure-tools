
'use strict'

import {TreeViewModel} from './tree/treeViewModel';
import {RedisAccountViewModel} from './tree/redisAccountViewModel';
import {RedisKeyViewModel} from './tree/redisKeyViewModel';
import {ReliableRedisClient, RedisConnection} from './redis-model/reliableRedisClient';
import {RedisConnectionVM} from './viewModels/redisConnectionVM';
import IDialogService = angular.material.IDialogService;

export class RedisController {
    title: string = 'Redis';
    dialog: IDialogService = null;
    gridOptions: any;
    scope: any;
    connection: RedisConnection;
    treeViewModel: TreeViewModel = new TreeViewModel();

    static $inject: Array<string> = ['$scope', '$log', '$mdDialog', '$q'];
    constructor($scope, $log: ng.ILogService, $mdDialog: IDialogService, $q: ng.IQService) {
        var redis = new ReliableRedisClient(new RedisConnection(1, '', ''));
        this.scope = $scope;
        this.dialog = $mdDialog;

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
    }

    showConnectionDialog(ev) {
        var self = this
        self.dialog.show({
            templateUrl: `./app/redis/views/settingsView.html`,
            controller($scope, $mdDialog: IDialogService) {
                var vm = new RedisConnectionVM($mdDialog, (connection) => {
                    self.connection = connection;
                    self.loadAccounts();
                });
                $scope.vm = vm;
            }
        });
    };

    loadAccounts() {
        var redis = new ReliableRedisClient(this.connection);
        var account = new RedisAccountViewModel(this.treeViewModel, this.connection, redis);
        this.treeViewModel.add(account);

    }
};