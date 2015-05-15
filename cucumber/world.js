var Nemo            = require('nemo');
var Configuration   = require('./configuration');

var WorldConstructor = function WorldConstructor(callback) {

    var self = this;
    var cwd = process.cwd();
    var nemo;

    nemo = new Nemo(cwd, new Configuration().override(), function(){
        self.driver = nemo.driver;
        self.config = nemo._config;
        self.nemo = nemo;
        self.isSauce = process.env.SAUCE;
        callback();
    });

};

exports.World = WorldConstructor;