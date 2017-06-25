(function () {'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var os = require('os');
var env = require('./vendor/electron_boilerplate/env_config');
var devHelper = require('./vendor/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 1000,
    height: 1200
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.loadURL('file://' + __dirname + '/renderer/app.html');

    mainWindow.webContents.executeJavaScript(`
    var path = require('path');
    module.paths.push(path.resolve('node_modules'));
module.paths.push(path.resolve('../node_modules'));
module.paths.push(path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app', 'node_modules'));
module.paths.push(path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app.asar', 'node_modules'));
    path = undefined;
  `);
    if (env.name === 'development') {
        devHelper.setDevMenu();
        mainWindow.openDevTools();
    }

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

app.on('window-all-closed', function () {
    app.quit();
});

}());
//# sourceMappingURL=main.js.map