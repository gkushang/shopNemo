'use strict';

module.exports = function offer_details_steps() {

    this.World = require("../../cucumber/world").World;

    this.Then(/^an Affiliate Offer is in Shop$/, function(callback) {
        this.driver.get(this.config.get('data').baseUrl);
        callback();
    });

    this.Then(/^I ask to see Affiliate Offer tile$/, function(callback) {
        callback.pending();
    });

    this.Then(/^I see Affiliate offer information on tile$/, function(callback) {
        callback.pending();
    });
};
