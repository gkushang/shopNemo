/**
 * Created by kugajjar on 5/13/15.
 */

module.exports = function offerModal(nemo){

    nemo.view.offerModal.merchantNameWaitVisible();

    var getMerchantName = function () {

        return nemo.view.offerModal.merchantName().getText();
    };

    var getOfferTitle = function () {

        return nemo.view.offerModal.offerTitle().getText();
    };

    return {
        getMerchantName: getMerchantName,
        getOfferTitle: getOfferTitle
    }
};