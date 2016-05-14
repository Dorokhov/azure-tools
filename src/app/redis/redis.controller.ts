'use strict'

import {TreeViewModel} from './tree/treeViewModel';
import {RedisAccountViewModel} from './tree/redisAccountViewModel';
import {RedisKeyViewModel} from './tree/redisKeyViewModel';

export namespace app.redis {
    import AlertDialog = angular.material.IDialogService;

    export class RedisController {
        title: string = 'Redis';
        dialog: AlertDialog = null;
        gridOptions: any;
        treeViewModel: TreeViewModel;
        showAlert(ev) {
            this.dialog.show(
                this.dialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('This is an alert title')
                    .textContent('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev));
        };

        static $inject: Array<string> = ['$mdDialog', '$q'];
        constructor($mdDialog: AlertDialog, $q: ng.IQService) {
            this.dialog = $mdDialog;
            console.log(treeViewModel)
            var treeViewModel = new TreeViewModel();
            var accounts = new Array<RedisAccountViewModel>();
            treeViewModel.add(new RedisAccountViewModel(treeViewModel, '1', '1', 6979, () => {
                console.log('$q')
                console.log($q)
                return $q.resolve<RedisKeyViewModel[]>([new RedisKeyViewModel('key1')])
            }));
            treeViewModel.add(new RedisAccountViewModel(treeViewModel, '2', '2', 6979, () => { return $q.resolve<RedisKeyViewModel[]>([new RedisKeyViewModel('key2')]) }))
            this.gridOptions = {
                data: treeViewModel.items,
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
}