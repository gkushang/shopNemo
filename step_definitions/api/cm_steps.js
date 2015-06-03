'use strict';

var cm = require('../../lib/cm/offer');

module.exports = function cm_steps() {

    this.Then(/^an Affiliate Offer is in Shop$/, function(callback) {

        cm(this.nemo)
            .create_affiliate_offer().done(callback);

    });
};
