'use strict';

var loadOffersPage = require('./allOffersPage');

function HomePage(nemo) {
    this.nemo = nemo;
    this.nemo.view.homePage.offersTabWaitVisible();
}

HomePage.prototype.goToOffersPage = function () {
    this.nemo.view.homePage.offersTab().click();
    return loadOffersPage(this.nemo);
};

module.exports = HomePage;
