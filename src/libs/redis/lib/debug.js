'use strict';

var index = require('../index.js');

function debug () {
    if (index.debug_mode) {
        console.error.apply(null, arguments);
    }
}

module.exports = debug;
