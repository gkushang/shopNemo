'use strict';

var cm = require('../../lib/cm/offer');

module.exports = function cm_steps() {

    this.Then(/^an Affiliate Offer is in Shop$/, function(callback) {

        var self = this;

        cm(this.nemo)
            .create_affiliate_offer()
            .done(getAffiliateOffer, callback);

        function getAffiliateOffer(affiliate_offer){
            self.affiliate_offer = affiliate_offer;
            callback();
        }
    });
};
