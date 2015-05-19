'use strict';

var navigate    = require('../../pages/navigate');

var myHooks = function () {

    this.World = require("../../cucumber/world").World;

    this.After(function(scenario, done) {

        var driver = this.driver;
        var self = this;

        if(this.sauce !== undefined) {

            self.sauceTunnel.close(function() {

                self.nemo.saucelabs.isJobPassed(!scenario.isFailed(), quitDriver);
                console.log('Test ran on sauce labs ' + self.sauce + ' browser, here is the job url: ' +
                    self.nemo.saucelabs.getJobUrl())});

        }else {
            console.log('Test ran locally');
            takeScreenShot().then(quitDriver);
        }

        function takeScreenShot() {
            if(scenario.isFailed()) {
                return driver.takeScreenshot().then(function (buffer) {
                    return scenario.attach(new Buffer(buffer, 'base64').toString('binary'), 'image/png');
                });
            }
        }

        function quitDriver() {
            driver.quit();
            done();
        }

    });

    this.Before(function (scenario, next) {

        console.log('Running Scenario: ' + scenario.getName());

        this.homePage = navigate(this.nemo).toHome();

        if(this.sauce !== undefined) {
            this.nemo.saucelabs.updateJob({
                name: scenario.getName(),
                cucumber_tags: scenario.getTags()
            }, next);

        }else {
            next();
        }

    });
};

module.exports = myHooks;
