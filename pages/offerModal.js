/**
 * Created by kugajjar on 5/13/15.
 */

module.exports = function offerModal(nemo){

    nemo.view.offerModal.merchantNameWaitVisible();

    var getMerchantName = function () {

        return nemo.view.offerModal.merchantName().getText();
    };

    return {
        getMerchantName: getMerchantName
    }
};