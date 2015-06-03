/**
 * Created by kugajjar on 6/3/15.
 */

var crypto = require('crypto'),
    request = require('request'),
    Q       = require('q');

module.exports = function api_client(nemo) {

    var config = nemo._config.get('cm').api;

    var getToken = function () {

        var startDate = new Date(),
            time = startDate.getTime(),
            secret = config.password + time,
            token = crypto.createHash('sha1')
                .update(secret)
                .digest('hex');

        return {
            token: token,
            time: time
        };

    };

    var submit_affiliate_offer = function(affiliate_offer) {

        var d = Q.defer();

        var tokens = getToken(),
            url_params = '?key=' + config.key + '&t=' + tokens.time + '&token=' + tokens.token,
            post_offer_url = config.url + '/affiliate_offers.json' + url_params + '&include=nested,shopping_distribution,stores,distributions';

        var options = {
            url: post_offer_url,
            method: 'POST',
            body: affiliate_offer,
            json: true,
            encoding: 'utf-8'
        };

        request(options, function (err, response) {

            var offer_response = response.body.affiliate_offer;

            if (!err && response.statusCode === 201) {

                console.log('Affiliate Offer Id: ' + offer_response.id);
                d.fulfill(offer_response.id);

            } else {

                if (response.statusCode === 422) {

                    var error_message = 'The response code was: '
                        + response.statusCode + '.\nErrors: '
                        + JSON.stringify(offer_response.errors);

                    console.error
                    (
                        error_message,
                        offer_response
                    );

                    d.fulfill(error_message);

                } else {

                    d.fulfill(err);
                }
            }
        });

        return d.promise;
    };

    return {
        submit_affiliate_offer: submit_affiliate_offer
    };
};

