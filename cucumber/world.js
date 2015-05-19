var Nemo            = require('nemo');
var configuration   = require('./../config/configuration');

var WorldConstructor = function WorldConstructor(callback) {

    var self = this;
    var cwd = process.cwd();
    var nemo;

    nemo = new Nemo(cwd, configuration().override(), function(){
        self.driver = nemo.driver;
        self.config = nemo._config;
        self.nemo = nemo;
        self.sauce = process.env.SAUCE;
        callback();
    });

};

exports.World = WorldConstructor;