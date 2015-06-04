/**
 * Created by kugajjar on 6/3/15.
 */

'use strict';

var affiliate_offer         = require('../../providers/affiliate_offer.json').affiliate_offer,
    Q                       = require('q'),
    utils                   = require('../utils/utils'),
    client                  = require('./client');

require('date-utils');

module.exports = function cm(nemo) {

    var setup_affiliate_offer = function () {

        var deferred = Q.defer();

        affiliate_offer.bml_id = utils().generate_random_number(10);
        affiliate_offer.shopping_title = '$$ JS-Offer: ' + utils().generate_random_number(4);
        affiliate_offer.expiration_date = Date.tomorrow();
        affiliate_offer.shopping_distribution.start_date = new Date();
        affiliate_offer.shopping_distribution.end_date = Date.tomorrow();

        deferred.resolve(affiliate_offer);

        return deferred.promise;

    };


    var create_affiliate_offer = function() {
        return setup_affiliate_offer()
            .then(submit_affiliate_offer);

        function submit_affiliate_offer(affiliate_offer) {
            return client(nemo)
                .submit_affiliate_offer(affiliate_offer);
        }

    };


    return {
        create_affiliate_offer: create_affiliate_offer
    }
};


