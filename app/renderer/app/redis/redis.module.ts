'use strict';

import $ = require('jquery');
$;
import angular = require('angular');
angular;
import angularMaterial = require('angular-material');
angularMaterial;
import router = require('angular-ui-router');
router;
import {RedisController} from './redis.controller';
import resizer = require('../common/resizer.module');
resizer;
import sanitize = require('angular-sanitize');
sanitize;
import redis = require('./redis-model/reliableRedisCLient');

import * as angularUiGrid from 'angular-ui-grid';

angular
    .module('redis', ['ui.router', 'ngMaterial', 'resizer', 'ui.grid.autoResize', 'ui.grid.selection', 'ui.grid', 'ngSanitize' ]);

angular
    .module('redis')
    .controller('RedisController', RedisController)
    .service('RedisConnectionRepository', redis.RedisConnectionRepository)
    .config(($stateProvider) => {
        $stateProvider.state('redis', {
            url: '/redis',
            templateUrl: 'app/redis/redis.html',
            controller: 'RedisController',
            controllerAs: 'vm'
        });
    });