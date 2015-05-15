
var myHooks = function () {

    this.World = require("../../cucumber/world").World;

    this.After(function(scenario, callback) {

        var driver = this.driver;

        if(this.isSauce !== undefined) {
            this.nemo.saucelabs.isJobPassed(!scenario.isFailed(), quitDriver);

        }else {
            quitDriver();
        }

        function quitDriver() {
            driver.quit();
            callback();
        }

    });

    this.Before(function (scenario, next) {

        console.log('Running Scenario: ' + scenario.getName());

        if(this.isSauce !== undefined) {
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
