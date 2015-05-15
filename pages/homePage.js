'use strict';

var allOffersPage = require('./allOffersPage');

module.exports = function homePage(nemo) {

    var homePageView = nemo.view.homePage;

    homePageView.offersTabWaitVisible();

    var goToOffersPage = function () {

        homePageView.offersTab().click();
        return allOffersPage(nemo);
    };

    return {
        goToOffersPage: goToOffersPage
    }
};

