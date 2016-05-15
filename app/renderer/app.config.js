/// <reference path="../../typings/tsd.d.ts" />
var app;
(function (app) {
    'use strict';
    var Config = (function () {
        function Config($logProvider) {
            $logProvider.debugEnabled(true);
        }
        return Config;
    }());
    app.Config = Config;
})(app || (app = {}));
