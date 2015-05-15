'use strict';

var should = require('chai').should();

module.exports = function offer_details_steps() {

    this.Then(/^an Affiliate Offer is in Shop$/, function(callback) {

        this.allOffersPage = this.homePage.goToOffersPage();

        this.offerId = "fc677430-a3ed-0132-9d21-7a163e74bed5";

        callback();
    });

    this.Then(/^I ask for offer details$/, function(done) {

        this.offerModal = this.allOffersPage
                              .seeOfferModal(this.offerId);
        done();

    });

    this.Then(/^I am presented with the offer modal$/, function(done) {

        this.offerModal
            .then(getMerchantName)
            .then(assertMerchantName);

        function getMerchantName(modal) {
            return modal.getMerchantName();
        }

        function assertMerchantName(name) {
            name.should.equal('abc');
            done();
        }
    });

};
