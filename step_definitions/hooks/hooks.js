'use strict';

var navigate = require('../../pages/navigate');

var myHooks = function () {

    this.World = require("../../cucumber/world").World;

    this.After(function(scenario, callback) {

        var driver = this.driver;

        if(this.sauce !== undefined) {
            this.nemo.saucelabs.isJobPassed(!scenario.isFailed(), quitDriver);
            console.log('Test ran on sauce labs ' + this.sauce + ' browser, here is the job url: ' + this.nemo.saucelabs.getJobUrl());

        }else {
            console.log('Test ran locally');
            quitDriver();
        }

        function quitDriver() {
            driver.quit();
            callback();
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
