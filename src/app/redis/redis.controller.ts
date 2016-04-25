/// <reference path='../../all.ts' />
export namespace app.redis {
    import AlertDialog = angular.material.IDialogService;

    export class RedisController {
        title: string = 'Redis';
        dialog: AlertDialog = null;
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

        static $inject: Array<string> = ['$mdDialog'];
        constructor($mdDialog: AlertDialog) {
            this.dialog = $mdDialog;
        }
    };
}