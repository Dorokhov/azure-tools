/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./app.config.ts" />
/// <reference path="./app.route.ts" />
/// <reference path="./app.run.ts" />
/// <reference path="./main/main.controller.ts" />
var app;
(function (app) {
    'use strict';
    angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngResource',
        'ui.router',
        'ngMaterial'
    ])
        .config(app.Config)
        .config(app.RouterConfig)
        .run(app.RunBlock)
        .controller('MainController', app.MainController);
})(app || (app = {}));
