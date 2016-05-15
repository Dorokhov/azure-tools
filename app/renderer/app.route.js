/// <reference path="../../typings/tsd.d.ts" />
var app;
(function (app) {
    'use strict';
    var RouterConfig = (function () {
        function RouterConfig($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('main', {
                url: '/main',
                templateUrl: 'main/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            });
            $urlRouterProvider.otherwise('/main');
        }
        return RouterConfig;
    }());
    app.RouterConfig = RouterConfig;
})(app || (app = {}));
