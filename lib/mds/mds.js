/**
 * Created by kugajjar on 6/3/15.
 */

var crypto          = require('crypto'),
    request         = require('request'),
    HttpStatus      = require('http-status-codes'),
    url             = require('url'),
    async           = require('async');
    Q               = require('q');

module.exports = function mds(nemo) {

    var config = nemo._config.get('mds');

    var wait_till_offer_is_available = function(offer_id) {

        var d = Q.defer();

        var options = {
            url: url.resolve(config.baseUrl, config.offerSearchEndPoint),
            method: 'GET',
            qs: {ids: offer_id}
        };

        var isOfferAvailable = false;

        async.whilst(
            function () {
                return !isOfferAvailable;
            },

            function (callback) {
                requestMds();
                setTimeout(function exit(){
                    isOfferAvailable = true;
                }, 1000);
                callback();
            },

            function (err) {
                console.log('error in mds: ', err);
            }
        );

        function requestMds() {
            isOfferAvailable = true;
            request(options, function (err, response) {

                console.log("mds request url: ", response.request.href);

                if (response.body.shopOfferId !== undefined) {
                    isOfferAvailable = true;
                }
                //var offer_response = response.body.affiliate_offer;
                //
                //if (!err && response.statusCode === HttpStatus.CREATED) {
                //
                //    console.log('Affiliate Offer Id: ' + offer_response.id);
                //    d.fulfill(offer_response);
                //
                //} else {
                //
                //    if (response.statusCode === HttpStatus.UNPROCESSABLE_ENTITY) {
                //
                //        var error_message = 'The response code was: '
                //            + response.statusCode + '.\nErrors: '
                //            + JSON.stringify(offer_response.errors);
                //
                //        console.error
                //        (
                //            error_message,
                //            offer_response
                //        );
                //
                //        d.reject(error_message);
                //
                //    } else {
                //
                //        d.reject(err);
                //    }
                //}

                d.resolve();

            });
        }


        return d.promise;
    };

    return {
        wait_till_offer_is_available: wait_till_offer_is_available
    };
};

