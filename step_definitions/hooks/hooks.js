'use strict';

var navigate        = require('../../pages/navigate'),
    sauceConnect     = require('../../sauce_connect/sauceConnect'),
    Q               = require('q'),
    Nemo            = require('nemo'),
    configuration   = require('../../config/configuration');


var myHooks = function () {

    this.World = require("../../cucumber/world").World;

    var sauceConnectProcess;

    this.After(function(scenario, done) {

        var driver = this.driver;

        if(process.env['SAUCE']) {
            console.log('Test ran on sauce labs ' + process.env['SAUCE'] + ' browser, here is the job url: ' +
                this.nemo.saucelabs.getJobUrl());

            this.nemo.saucelabs.isJobPassed(!scenario.isFailed(), quitDriver);

        } else {
            console.log('Test ran locally');

            if(scenario.isFailed()) {
                takeScreenShot().then(quitDriver);
            } else {
                quitDriver();
            }
        }

        function takeScreenShot() {
            return driver.takeScreenshot().then(function (buffer) {
                    return scenario.attach(new Buffer(buffer, 'base64').toString('binary'), 'image/png');
                });
        }

        function quitDriver() {
            console.log("quit driver");
            driver.quit().then(done);
        }
    });

    this.Before(function (scenario, next) {

        var self = this;

        launchNemo(this).then(function (){
            console.log('Running Scenario: ' + scenario.getName());

            self.homePage = navigate(self.nemo).toHome();

            if(process.env['SAUCE']) {
                self.nemo.saucelabs.updateJob({
                    name: scenario.getName(),
                    cucumber_tags: scenario.getTags()
                }, next);

            } else {
                next();
            }
        });
    });

    this.registerHandler('AfterFeatures', function (event, callback) {

        if(process.env['SAUCE']) {
             sauceConnectProcess.close(callback);
        } else {
            callback();
        }
    });

    this.registerHandler('BeforeFeatures', function (event, callback) {

        if(process.env['SAUCE']) {
            sauceConnect().connect()
                .then(function sauceConnected(sauceConnect) {
                    sauceConnectProcess = sauceConnect;
                    callback();
                });

        } else {
            callback();
        }
    });

    function launchNemo(self) {

        var deferred = Q.defer();

        var nemo;

        nemo = new Nemo(process.cwd(), configuration().override(), function() {
            self.driver = nemo.driver;
            self.config = nemo._config;
            self.nemo = nemo
            deferred.resolve();
        });

        return deferred.promise;
    }
};

module.exports = myHooks;
