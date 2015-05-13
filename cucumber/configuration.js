
"use strict";

function Configuration() {
}

Configuration.prototype.override = function override() {

    var env = process.env.NODE_ENV;

    console.log('running tests on ' + env + ' environment');

    if (env === undefined) {
        throw new Error('NODE_ENV must be defined');
    }

    return process.cwd() + '/config/' + env + '.json';
};

module.exports = Configuration;


