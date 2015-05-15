
"use strict";

var sauceConfig        = require('../config/sauce.json');
var _                  = require('underscore');

function Configuration() {
}

Configuration.prototype.override = function override() {

    var env = process.env.NODE_ENV;
    var sauce = process.env.SAUCE;
    var config = process.cwd() + '/config/' + env + '.json';

    console.log('running tests on ' + env + ' environment');

    if (env === undefined) {
        throw new Error('NODE_ENV must be defined');
    }

    if (sauce !== undefined) {
        console.log('test ran on sauce labs ' + sauce + ' browser');
        config = _.extend(require('../config/' + env + '.json'), sauceConfig[sauce]);
    }

    return config;
};

module.exports = Configuration;


