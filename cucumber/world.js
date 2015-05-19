var Nemo            = require('nemo');
var configuration   = require('./../config/configuration');

var WorldConstructor = function WorldConstructor(callback) {

    var self = this;
    var cwd = process.cwd();
    var nemo;

    if(process.env.SAUCE === undefined) {
        launchNemo();
    }else {
        launchSauceConnectAndNemo();
    }

    function launchNemo() {

        nemo = new Nemo(cwd, configuration().override(), function(){
            self.driver = nemo.driver;
            self.config = nemo._config;
            self.nemo = nemo;
            self.sauce = process.env.SAUCE;
            callback();
    })}

    function launchSauceConnectAndNemo() {

        var sauceConnectLauncher = require('sauce-connect-launcher');
        var config = require('../config/config.json');

        var options =  {
            username: config.driver.serverCaps.username,
            accessKey: config.driver.serverCaps.accessKey,
            i: config.driver.serverCaps['tunnel-identifier']
        };


        console.log('please wait...');
        console.log('launching sauce connect to run your test:', JSON.stringify(options));

        sauceConnectLauncher(options, function (err, sauceConnectProcess) {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log("Sauce Connect is ready. Launching sauce labs browser now...");
            self.sauceTunnel = sauceConnectProcess;
            launchNemo();
        });
    }

};

exports.World = WorldConstructor;