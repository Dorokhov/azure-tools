
'use strict'

import {RedisAccountViewModel} from './redisAccountViewModel';
import {RedisDatabaseViewModel} from './redisDatabaseViewModel';
import {RedisKeyViewModel} from './redisKeyViewModel';
import {utils} from '../../common/utils';

export class TreeViewModel {
    public items: any[];
    public name: string;
    public gridOptions: any;
    public selectedItems: Array<any> = new Array<any>();
    constructor($log, $scope: any) {
        var self = this;
        this.items = new Array();

        var ifAccount = 'row.entity.constructor.name === \'' + RedisAccountViewModel.name + '\'';
        var ifDatabase = 'row.entity.constructor.name === \'' + RedisDatabaseViewModel.name + '\'';
        var ifKey = 'row.entity.constructor.name === \'' + RedisKeyViewModel.name + '\'';
        this.gridOptions = {
            data: this.items,
            showHeader: false,
            columnDefs: [
                {
                    name: 'name',
                    field: 'name',
                    cellTemplate:
                    String.format(
                    '<div class="ui-grid-cell-contents" ng-click="row.entity.expandOrCollapse()" flex layout="row" layout-align="start center">' +
                    '<div >'+
                    // account
                    '<i class="fa" aria-hidden="true" ng-class="row.entity.isExpanded ? \'fa-caret-down\' : \'fa-caret-right\'" style="margin:5px;" ng-if="{0} || {1}"></i>' +
                    '<md-icon md-font-icon="fa fa-server fa-lg" class="md-warn" ng-if="{0}"></md-icon>' +
                   // '<i class="fa fa-server" aria-hidden="true" style="margin-right:5px" ng-if="{0}"></i>' +
                    
                    // database
                    '<i class="fa fa fa-database" aria-hidden="true" style="margin-right:5px; margin-left:15px;" ng-if="{1}"></i>' +
                    
                    // key
                    '<i class="fa fa fa-key" aria-hidden="true" style="margin-right:5px; margin-left:55px;" ng-if="{2}"></i>' +
                    
                    '{{row.entity[col.field]}}' +
                    '</div>' +
                    // busy indicator
                    '<md-progress-circular mode="indeterminate" class="md-accent" md-diameter="30" flex ng-if="row.entity.executingPromise.isPending() || row.entity.executingPromise.$$state.pending"></md-progress-circular>'+
                    '</div>', ifAccount, ifDatabase, ifKey)
                },
            ],

            rowHeight: 30,
            noUnselect: true,
            enableRowSelection: true,
            enableSelectAll: false,
            enableFullRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: true,
            enableColumnMenus: false,
            selectedKeys: [],
            modifierKeysToMultiSelect: true,
            virtualizationThreshold: 30,
        };

        this.gridOptions.onRegisterApi = function (gridApi) {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $log.log(row.entity);
                self.selectedItems.length = 0;
                self.selectedItems.push(row.entity);

                if (utils.isOfType(row.entity, RedisKeyViewModel)) {
                    row.entity.loadDetails();
                }
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;
                $log.log(msg);
            });
        };
    }

    add(account: RedisAccountViewModel) {
        this.items.push(account);
    }
};