'use strict';
var waitUntil       = require('wait-until'),
    poll        = require('poll-until'),
    should      = require('chai').should();

module.exports = function cm_steps() {

    this.Then(/^anaaaaa Affiliate Offer is in Shop$/, function(callback) {

        var timeout;

        //var stop = pollUntil(createAffiliateOffer, 100, callback);

        timeout = setInterval(createAffiliateOffer, 100);

        function createAffiliateOffer() {
            'offer should be created'.should.equal('not');
            return false;
        }

        setTimeout(function () {
            clearInterval(timeout);
            callback();

        }, 1000);


        function pollUntil(condition, interval, callback) {
            if (condition && condition()) {
                timeout = null;
                callback();
            } else {
                timeout =  setInterval(function () {
                    //console.log('call set timeout');
                    pollUntil(condition, interval);
                }, interval || 197);
            }
            return function stop() {
                //console.log('poll until STOP');
                clearInterval(timeout);
            };
        }

    });
};













//waitUntil()
//    .interval(100)
//    .times(200)
//    .condition(createAffiliateOffer)
//    .done(isSucceeded);


