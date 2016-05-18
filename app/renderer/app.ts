'use strict';

import $ = require('jquery');
$;
import angularUiRouter = require('angular-ui-router');
angularUiRouter;
import angular = require('angular');
angular;
import angularMaterial = require('angular-material');
angularMaterial;
import uiGrid = require('angular-ui-grid');
uiGrid;

import * as redis from './app/redis/redis.module';
redis;

module app {
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