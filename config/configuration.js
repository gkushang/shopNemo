
"use strict";

var sauceConfig        = require('./sauce.json');
var _                  = require('underscore');

module.exports = function configuration() {

    var override = function() {
        var env = process.env.NODE_ENV;
        var sauce = process.env.SAUCE;
        var config = process.cwd() + '/config/' + env + '.json';

        console.log('running tests on ' + env + ' environment');

        if (env === undefined) {
            throw new Error('NODE_ENV must be defined');
        }

        if (sauce) {

            if (sauceConfig[sauce] === undefined) {
                throw new Error('SAUCE value ' + sauce + ' does not exists. Please verify your command line arguments.');
            }

            config = _.extend(require('../config/' + env + '.json'), sauceConfig[sauce]);
        }

        return config;
    };

    return {
        override: override
    }
};

