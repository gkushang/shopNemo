/**
 * Created by kugajjar on 5/13/15.
 */

module.exports = function loadAllOffersPage(nemo) {
    nemo.view.homePage.allOffersTextWaitVisible();

    var findOffer = function (id) {
        return nemo.view._waitVisible('css:#offer-' + id);
    };

    var seeOfferModal = function (id) {
        return findOffer(id).then(function(offer) {
            offer.click();
            return nemo.view.offerModal;
        });
    };

    return {
        seeOfferModal: seeOfferModal
    }
};