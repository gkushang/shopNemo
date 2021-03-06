/**
 * Created by kugajjar on 6/3/15.
 */

'use strict';

var crypto          = require('crypto'),
    request         = require('request'),
    HttpStatus      = require('http-status-codes'),
    url             = require('url'),
    debug           = require('debug')('acceptance-test (cm-client):'),
    Q               = require('q');

module.exports = function client(nemo) {

    var config = nemo._config.get('cm');

    var authentication_params = function (){

        var timeStamp = new Date().getTime();

        return {
            key: config.key,
            t: timeStamp,
            token: generate_token()
        };

        function generate_token () {

            var secret = config.password + timeStamp;

            return crypto.createHash('sha1')
                .update(secret)
                .digest('hex');
        }
    };

    var submit_affiliate_offer = function(affiliate_offer) {

        var d = Q.defer();

        var options = {
                url: url.resolve(config.baseUrl, config.affiliateOfferEndPoint),
                method: 'POST',
                body: affiliate_offer,
                json: true,
                encoding: 'utf-8',
                qs: authentication_params()
            };

        request(options, function (err, response) {

            var offer_response = response.body.affiliate_offer;

            if (!err && response.statusCode === HttpStatus.CREATED) {

                debug('Affiliate Offer Id: ', offer_response.id);
                d.fulfill(offer_response);

            } else {

                if (response.statusCode === HttpStatus.UNPROCESSABLE_ENTITY) {

                    var error_message = 'The response code was: '
                        + response.statusCode + '.\nErrors: '
                        + JSON.stringify(offer_response.errors);

                    console.error
                    (
                        error_message,
                        offer_response
                    );

                    d.reject(error_message);

                } else {

                    d.reject(err);
                }
            }

        });

        return d.promise;
    };

    return {
        submit_affiliate_offer: submit_affiliate_offer
    };
};

