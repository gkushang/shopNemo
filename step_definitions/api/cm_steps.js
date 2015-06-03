'use strict';

var should      = require('chai').should(),
    page     = require("../../service/pageService");


module.exports = function offer_details_steps() {

    var offerId         = '83adb8a0-da15-0132-04c4-7a163e457d39',
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
            .then(page.getMerchantName)
            .then(assertMerchantName);

        this.offerModal
            .then(page.getOfferTitle)
            .then(assertOfferTitle)
            .then(done);

    });

    this.Then(/^I look for offer tile$/, function(done)     {

        this.offerTile = this.allOffersPage
                             .searchOfferTile(offerId);
        done();
    });

    this.Then(/^I see offer information on tile$/, function(done) {

        this.offerTile
            .then(page.getMerchantName)
            .then(assertMerchantName);

        this.offerTile
            .then(page.getOfferTitle)
            .then(assertOfferTitle)
            .then(done);
    });

    function assertMerchantName(name) {
        //name.should.equal(merchantName);
    }

    function assertOfferTitle(title) {
        //title.should.contains(offerTitle);
    }
};
