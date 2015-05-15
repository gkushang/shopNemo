/**
 * Created by kugajjar on 5/13/15.
 */

module.exports = function offerTile(id, nemo){

    var OFFER_ID_CSS = '#offer-',
        MERCHANT_NAME_CSS = '>div.offerTileContent>div>div.nameTagline>h2.merchantName',
        OFFER_TITLE_CSS = '>div.offerTileContent>div.ng-scope>div.nameTagline>h1.offerTitle';

    var getMerchantName = function () {

        return nemo.view._find('#offer-' + id + MERCHANT_NAME_CSS).then(function merchantName(element) {
            return element.getText();
        });
    };

    var getOfferTitle = function () {


        return nemo.view._find(OFFER_ID_CSS + id + OFFER_TITLE_CSS).then(function offerTitle(element) {
            return element.getText();
        });
    };

    return {
        getMerchantName: getMerchantName,
        getOfferTitle: getOfferTitle
    }
};