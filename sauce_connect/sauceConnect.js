/**
 * Created by kugajjar on 5/20/15.
 */

var sauceConnectLauncher    = require('sauce-connect-launcher'),
    config                  = require('../config/config.json'),
    Q                       = require('q');


module.exports = function sauceConnect() {

    var connect = function() {

        var deferred = Q.defer();

        var options =  {
            username: config.driver.serverCaps.username,
            accessKey: config.driver.serverCaps.accessKey,
            i: config.driver.serverCaps['tunnel-identifier']
        };

        console.log('please wait, deploying sauce tunnel to run your test:', JSON.stringify(options));

        sauceConnectLauncher(options, tunnelLaunched);

        function tunnelLaunched(err, sauceConnectProcess) {

            if (err) {

                console.error(err.message);
                return;
            }

            console.log("Sauce Connect is ready. Launching sauce labs browser now...");

            deferred.resolve(sauceConnectProcess);
        }

        return deferred.promise;
    };

    return {
        connect: connect
    }
};
