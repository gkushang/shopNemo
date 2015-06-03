/**
 * Created by kugajjar on 6/3/15.
 */

'use strict';

var affiliate_offer         = require('../../providers/affiliate_offer.json'),
    Q                       = require('q'),
    client                  = require('./api_client');

module.exports = function offer(nemo) {

    var setup_affiliate_offer = function () {

        var deferred = Q.defer();

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


