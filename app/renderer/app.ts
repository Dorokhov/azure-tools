/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./app.config.ts" />
/// <reference path="./app.route.ts" />
/// <reference path="./app.run.ts" />


	import $ = require('jquery');
	import angularUiRouter = require('angular-ui-router');
	import angular = require('angular'); angular;
	import angularMaterial = require('angular-material');
	import uiGrid = require('angular-ui-grid');

	import * as redis from './app/redis/redis.module';

module app {

    'use strict';
    console.log(angularMaterial);
    console.log(angularUiRouter);
    console.log(redis);
    console.log($);

	console.log(uiGrid);
    angular
        .module('app', ['ui.router', 'ngMaterial', 'redis'])
        .config(($stateProvider, $urlRouterProvider) => {
            $stateProvider
                .state('tiles', {
                    url: '/tiles',
                    templateUrl: 'app/tiles/tiles.html',
                });

            // default
            $urlRouterProvider.otherwise('tiles');
        });
}