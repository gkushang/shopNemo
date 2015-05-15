'use strict';

var should      = require('chai').should(),
    service     = require("../../service/service");


module.exports = function offer_details_steps() {

    var offerId         = 'fc677430-a3ed-0132-9d21-7a163e74bed5',
        merchantName    = 'DisneyStore.com',
        offerTitle      = 'Free shipping on $75+';

    this.Then(/^an Affiliate Offer is in Shop$/, function(callback) {

        this.allOffersPage = this.homePage.goToOffersPage();

        callback();
    });

    this.Then(/^I ask for offer details$/, function(done) {

        this.offerModal = this.allOffersPage
                              .seeOfferModal(offerId);
        done();

    });

    this.Then(/^I am presented with the offer modal$/, function(done) {

        this.offerModal
            .then(service.getMerchantName)
            .then(assertMerchantName);

        this.offerModal
            .then(service.getOfferTitle)
            .then(assertOfferTitle)
            .then(done);

    });

    this.Then(/^I look for offer tile$/, function(done) {

        this.offerTile = this.allOffersPage
                             .searchOfferTile(offerId);
        done();
    });

    this.Then(/^I see offer information on tile$/, function(done) {

        this.offerTile
            .then(service.getMerchantName)
            .then(assertMerchantName);

        this.offerTile
            .then(service.getOfferTitle)
            .then(assertOfferTitle)
            .then(done);
    });

    function assertMerchantName(name) {
        name.should.equal(merchantName);
    }

    function assertOfferTitle(title) {
        title.should.equal(offerTitle);
    }
};
