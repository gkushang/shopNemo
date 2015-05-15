/**
 * Created by kugajjar on 5/13/15.
 */

var offerModal = require('./offerModal');
var offerTile = require('./offerTile');

module.exports = function allOffersPage(nemo) {

    nemo.view.allOffersPage.allOffersTextWaitVisible();

    var _findOffer = function (id) {
        return nemo.view._waitVisible('css:#offer-' + id);
    };

    var seeOfferModal = function (id) {
        return _findOffer(id).then(function(offer) {
            offer.click();
            return offerModal(nemo);
        });
    };

    var searchOfferTile = function (id) {
        return _findOffer(id).then(function () {
            return offerTile(id,nemo);
        });
    };

    return {
        seeOfferModal: seeOfferModal,
        searchOfferTile: searchOfferTile
    }
};