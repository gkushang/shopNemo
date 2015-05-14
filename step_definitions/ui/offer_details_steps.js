'use strict';

var Navigate = require('../../pages/navigate');
var modal = require('../../pages/offerModal');

module.exports = function offer_details_steps() {

    this.World = require("../../cucumber/world").World;

    this.Then(/^an Affiliate Offer is in Shop$/, function(callback) {

        this.homePage = new Navigate(this.nemo).toHome();

        this.allOffersPage = this.homePage.goToOffersPage();

        this.offerId = "9becb180-a3e5-0132-0228-7a163e457d39";

        callback();
    });

    this.Then(/^I ask for offer details$/, function(callback) {
        this.allOffersPage
            .seeOfferModal(this.offerId)
            .then(modal.getMerchantName)
            .then(testMerchantName);

        function testMerchantName(name) {
            //assert(name, "FTD.com");

            callback();
        }
    });

    this.Then(/^I am presented with the offer modal$/, function(callback) {
        callback.pending();
    });

};
