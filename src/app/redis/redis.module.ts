/// <reference path='../../all.ts' />
'use strict';

import $ = require('jquery');
import angular = require('angular');
import angularMaterial = require('angular-material');
import router = require('angular-ui-router');
import redisController = require('./redis.controller');
import resizer = require('../common/resizer.module');

export namespace app.redis {
    import RedisController = redisController.app.redis.RedisController;
    
    console.log(angularMaterial);
    console.log(router);
    console.log(resizer);

    angular
        .module('redis', ['ui.router', 'ngMaterial', 'resizer']);

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