
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
    treeViewModel: TreeViewModel;
    showAlert(ev) {
        this.dialog.show({
            templateUrl: `./app/redis/views/settingsView.html`,
            clickOutsideToClose: true,
            controller($scope, $mdDialog: ng.material.IDialogService) {
                var vm = new RedisConnectionVM($mdDialog, (connection)=>{});
                $scope.vm = vm;
            }
        });
    };

    static $inject: Array<string> = ['$scope', '$log', '$mdDialog', '$q'];
    constructor($scope, $log: ng.ILogService, $mdDialog: IDialogService, $q: ng.IQService) {
        var redis = new ReliableRedisClient(new RedisConnection(1, '', ''));
        this.scope = $scope;
        this.dialog = $mdDialog;

        var treeViewModel = new TreeViewModel();
        var accounts = new Array<RedisAccountViewModel>();

        treeViewModel.add(new RedisAccountViewModel(treeViewModel, '1', '1', 6979, () => {
            return $q.resolve<RedisKeyViewModel[]>([new RedisKeyViewModel('key1')])
        }));
        treeViewModel.add(new RedisAccountViewModel(treeViewModel, '2', '2', 6979, () => { return $q.resolve<RedisKeyViewModel[]>([new RedisKeyViewModel('key2')]) }));

        this.gridOptions = {
            data: treeViewModel.items,
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
};