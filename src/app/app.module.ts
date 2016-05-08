/// <reference path='../all.ts' />
/// <reference path='redis/redis.module.ts' />
import $ = require('jquery');
import angularUiRouter = require('angular-ui-router');
import angular = require('angular');
import angularMaterial = require('angular-material');
import * as redis from './redis/redis.module';

export namespace app {
    'use strict';
    console.log(angularMaterial);
    console.log(angularUiRouter);
    console.log(redis);
    console.log($);
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