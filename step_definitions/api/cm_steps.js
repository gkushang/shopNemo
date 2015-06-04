/**
 * Created by kugajjar on 6/3/15.
 */

'use strict';

var cm = require('../../lib/cm/offer'),
    mds = require('../../lib/mds/mds');

module.exports = function cm_steps() {

    this.Then(/^an Affiliate Offer is in Shop$/, function(callback) {

        var self = this;

        cm(this.nemo)
            .create_affiliate_offer()
            .done(getAffiliateOffer, callback);

        function getAffiliateOffer(affiliate_offer){
            self.affiliate_offer = affiliate_offer;
            mds(self.nemo).wait_till_offer_is_available(affiliate_offer.paypal_id).then(callback);
            //callback();
        }
    });
};

