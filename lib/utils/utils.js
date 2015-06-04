/**
 * Created by kugajjar on 6/4/15.
 */
'use strict';

module.exports = function utils() {

    var generate_random_number = function(length) {
        var begin = 2;
        return Math.random().toString().slice(begin,length + begin);
    };

    return {
        generate_random_number: generate_random_number
    }

};
