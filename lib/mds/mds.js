/**
 * Created by kugajjar on 6/3/15.
 */

var request         = require('request'),
    url             = require('url'),
    Q               = require('q'),
    debug           = require('debug')('acceptance-test (mds):');

module.exports = function mds(nemo) {

    var config = nemo._config.get('mds');

    var wait_till_offer_is_available = function(offer) {

        var offer_id = offer.paypal_id;

        var options = {
            url: url.resolve(config.baseUrl, config.offerSearchEndPoint),
            method: 'GET',
            qs: {ids: offer_id},
            cmId: offer.id
        };

        return poll_until(search_offer_by_id, config.timeOutInSeconds);

        function search_offer_by_id() {
            return make_get_request(options);
        }
    };

    var make_get_request = function(options) {
        var deferred = Q.defer();

        request(options, function (err, response) {
            var requestUrl = response.request.href;
            debug("waiting for offer to be available in MDS, the request url is: ", requestUrl);

            if (!response.body.shopOfferId) {
                deferred.reject('offer not found in MDS. Cm Id: ' + options.cmId + '. Mds request url: ' + requestUrl);
            }else{
                deferred.fulfill(response.body);
            }
        });

        return deferred.promise;
    };

    var poll_until = function(method, timeOutInSeconds) {

        var startTime = new Date().getTime();

        return retry(method, 200);

        function retry(method, interval) {
            var def = Q.defer();
            return method()
                .catch(function(reason) {
                    if((new Date().getTime() - startTime) > (timeOutInSeconds * 1000)) {
                        def.reject('[error] Timeout expired: ' + reason);
                        return def.promise;
                    }else {
                        return Q.delay(interval)
                            .then(retry.bind(null, method, interval));
                    }
                });
        }
    };

    return {
        wait_till_offer_is_available: wait_till_offer_is_available
    };
};

