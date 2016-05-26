
'use strict'

import {RedisAccountViewModel} from './redisAccountViewModel';
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

        var ifAccount = 'ng-if="row.entity.constructor.name === \'' + RedisAccountViewModel.name + '\'"';
        var ifKey = 'ng-if="row.entity.constructor.name === \'' + RedisKeyViewModel.name + '\'"';
        this.gridOptions = {
            data: this.items,
            showHeader: false,
            columnDefs: [
                {
                    name: 'name',
                    field: 'name',
                    cellTemplate:
                    String.format(
                    '<div class="ui-grid-cell-contents" ng-click="row.entity.expandOrCollapse()">' +
                    // account
                    '<i class="fa" aria-hidden="true" ng-class="row.entity.isExpanded ? \'fa-caret-down\' : \'fa-caret-right\'" style="margin:5px;" {0}></i>' +
                    '<i class="fa fa fa-server" aria-hidden="true" style="margin-right:5px" {0}></i>' +
                    
                    // key
                    '<i class="fa fa fa-key" aria-hidden="true" style="margin-right:5px" {1}></i>' +
                    
                    '{{row.entity[col.field]}}' +
                    '</div>', ifAccount, ifKey)
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