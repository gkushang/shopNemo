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

        //var endDate = new Date(new Date().setMilliseconds(new Date().getMilliseconds() + (2000 * 60 * 60)));

        //affiliate_offer.expiration_date = endDate;
        //affiliate_offer.shopping_title = 'Offer -' + Math.round(Math.random() * 1000000);

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


