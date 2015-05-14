'use strict';


var HomePage = require('./homePage');

function Navigate(nemo) {
    this.nemo = nemo;
}

Navigate.prototype.toHome = function () {

    this.nemo.driver.get(this.nemo._config.get('data').baseUrl);
    return new HomePage(this.nemo);
};

module.exports = Navigate;
