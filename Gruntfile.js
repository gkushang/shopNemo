'use strict';

module.exports = function (grunt) {

    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    grunt.registerTask('p1',['cucumberjs:p1']);
    grunt.registerTask('acceptance',['cucumberjs:all']);
};

