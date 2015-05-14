/**
 * Created by kugajjar on 5/13/15.
 */


module.exports = {
    getMerchantName: function getMerchantName(modal) {
        console.log("MODAL: ", modal);
        return modal.merchantName().getText().then(function (text) {
            console.log("NAME: ", text);
            return text;
        });
    }
};