/**
 * Created by kugajjar on 5/13/15.
 */

var offerModal = require('./offerModal');
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

    return {
        seeOfferModal: seeOfferModal
    }
};