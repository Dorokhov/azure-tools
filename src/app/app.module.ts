
import $ = require('jquery');
import angularUiRouter = require('angular-ui-router');
import angular = require('angular');angular;
import angularMaterial = require('angular-material');
import uiGrid = require('angular-ui-grid');

import * as redis from './redis/redis.module';

export namespace app {
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