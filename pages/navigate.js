'use strict';

var homePage = require('./homePage');

module.exports = function navigate(nemo) {

    var toHome = function () {

        nemo.driver.get(nemo._config.get('data').baseUrl);
        return homePage(nemo);
    };

    return {
        toHome: toHome
    }
};
