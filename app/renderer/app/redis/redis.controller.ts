
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
    treeViewModel: TreeViewModel;
    $timeout: any;

    static $inject: Array<string> = ['$scope', '$timeout', '$log', '$mdDialog', '$q', 'RedisConnectionRepository', 'uiGridConstants'];
    constructor(
        $scope,
        $timeout,
        protected $log: ng.ILogService,
        $mdDialog: IDialogService,
        protected $q: ng.IQService,
        redisConnectionRepo: IRedisConnectionRepository,
        uiGridConstants) {
        $log.debug(uiGridConstants);
        this.treeViewModel = new TreeViewModel($log, $scope);

        this.scope = $scope;
        this.dialog = $mdDialog;
        this.$timeout = $timeout;

        var accounts = new Array<RedisAccountViewModel>();

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
        var redis = new ReliableRedisClient(this.$log, this.$q, connection);
        var account = new RedisAccountViewModel(this.$log, this.$timeout, this.$q, this.treeViewModel, connection, redis);
        this.treeViewModel.add(account);
    };
};