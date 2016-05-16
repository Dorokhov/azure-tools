/// <reference path="../../typings/tsd.d.ts" />

module app {
  'use strict';

  export class RouterConfig {
    
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      
      $stateProvider
        .state('main', {
          url: '/main',
          templateUrl: 'main/main.html',
          controller: 'MainController',
          controllerAs: 'vm'
        })
      ;
      

      $urlRouterProvider.otherwise('/main');
    }

  }
}
