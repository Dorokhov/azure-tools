
'use strict'

import {RedisAccountViewModel} from './redisAccountViewModel';

export class TreeViewModel {
    public items: any[];
    public name: string;
    public gridOptions: any;
    public selectedItems: Array<any> = new Array<any>();
    constructor($log, $scope: any) {
        var self = this;
        this.items = new Array();

        this.gridOptions = {
            data: this.items,
            showHeader: false,
            columnDefs: [
                {
                    name: 'name',
                    field: 'name',
                    cellTemplate: '<div class="ui-grid-cell-contents"><button ng-click="row.entity.expandOrCollapse()" ng-bind="row.entity.isExpanded ? \'-\' : \'+\'"></button>{{row.entity[col.field]}}</div>'
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