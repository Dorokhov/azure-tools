(function (global) {
  global.os = require('os');

  // map tells the System loader where to look for things
  var map = {
    'app': '',
    'main': 'main.js',

    'reflect-metadata': '../node_modules/reflect-metadata/Reflect.js',

    'hammerjs': '../node_modules/hammerjs/hammer.js',
    'lodash': '../node_modules/lodash/lodash.js',

    '@angular/core': '../node_modules/@angular/core/bundles/core.umd.js',
    '@angular/common': '../node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': '../node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': '../node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': '../node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': '../node_modules/@angular/http/bundles/http.umd.js',
    '@angular/router': '../node_modules/@angular/router/bundles/router.umd.js',
    '@angular/forms': '../node_modules/@angular/forms/bundles/forms.umd.js',
    '@angular/material': '../node_modules/@angular/material/bundles/material.umd.js',

    '@angular/animations': '../node_modules/@angular/animations/bundles/animations.umd.min.js',
    '@angular/animations/browser': '../node_modules/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': '../node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',

    'mobx': '../node_modules/mobx/lib/mobx.umd.js',
    'ng2-mobx': '../node_modules/ng2-mobx/dist/ng2-mobx.umd.js',
    'angular2-tree-component': '../node_modules/angular2-tree-component/dist/angular2-tree-component.umd.js',

    'rxjs': '../node_modules/rxjs',
    'angular2-in-memory-web-api': '../node_modules/angular2-in-memory-web-api',

'double-ended-queue': '../node_modules/double-ended-queue/js/deque.js',
'redis-parser': '../node_modules/redis-parser/index.js',

   'redis': '../node_modules/redis/index.js',
   'redis-commands': '../node_modules/redis-commands/index.js',
   'bluebird': '../node_modules/bluebird/js/browser/bluebird.min.js',
   'hiredis': '../node_modules/hiredis/hiredis.js',
   'bindings': '../node_modules/bindings/bindings.js',
   'hiredis.node' : '../node_modules/hiredis/build/Release/hiredis.node',


    'node-binary': '../node_modules/systemjs-plugin-node-binary/node-binary.js'
   
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': {
      main: 'boot.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      main: 'Rx.js',
      defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': {
      defaultExtension: 'js'
    },
    'ng2-tree': {
      defaultExtension: 'js'
    },
    'lodash': {
      defaultExtension: 'js'
    },
    'redis': {
      defaultExtension: 'js',
      map : {
        'utils': '../node_modules/redis/lib/utils.js',
      }
    },
    'redis-commands': {
      defaultExtension: 'js'
    },
    'bluebird': {
      defaultExtension: 'js'
    },
    'bindings': {
      defaultExtension: 'js',
        meta: {
        'bindings': {
            'format': "cjs",
            'deps': ['hiredis.node']
        }
    }
    },

     '../node_modules/hiredis/build/Release': {
      defaultExtension: false,
      meta: {
        '*.node': {
          loader: 'node-binary'
        }
      }
    },
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/upgrade',
    'core-js',
    'reflect-metadata',
    'hammerjs',
    'lodash',
    'angular-tree-component',
    'redis',
  //  'hiredis',
    'bindings'
  ];

  var config = {
    map: map,
    packages: packages,
    meta: {
        'bindings': {
            'format': "cjs",
            'deps': ['hiredis.node']
        }
    }
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);