/**
 * Created by kugajjar on 5/21/15.
 */

var WorldConstructor = function WorldConstructor(callback) {
    this.env = process.env;
    callback();
};

exports.World = WorldConstructor;
