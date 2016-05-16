/// <reference path="../../typings/tsd.d.ts" />

module app {
  'use strict';

  export class Config {
    
    constructor($logProvider: ng.ILogProvider) {
    
      $logProvider.debugEnabled(true);

    }

  }
  
}