'use strict';

import $ = require('jquery');
import angular = require('angular');
import angularMaterial = require('angular-material');
import router = require('angular-ui-router');
import redisController = require('./redis.controller');
import resizer = require('../common/resizer.module');

import * as angularUiGrid from 'angular-ui-grid';
export namespace app.redis {
    import RedisController = redisController.app.redis.RedisController;
    

    console.log(angularMaterial);
    console.log(router);
    console.log(resizer);
    console.log(angularUiGrid);

    angular
        .module('redis', ['ui.router', 'ngMaterial', 'resizer', 'ui.grid']);

    angular
        .module('redis')
        .controller('RedisController', RedisController)
        .config(($stateProvider) => {
            $stateProvider.state('redis', {
                url: '/redis',
                templateUrl: 'app/redis/redis.html',
                controller: 'RedisController',
                controllerAs: 'vm'
            });
        });
}