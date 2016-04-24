/// <reference path='../all.ts' />
import angular = require('angular');
import angularMaterial = require('angular-material');

export namespace app {
    'use strict';
    console.log(angularMaterial);
    angular.module('app', ['ngMaterial']);
}