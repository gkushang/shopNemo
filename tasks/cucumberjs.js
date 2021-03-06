'use strict';

module.exports = function cucumberjs(grunt) {

    grunt.loadNpmTasks('grunt-cucumberjs');

    return {
        'all': {
            options: {
                format: 'html',
                output: 'report/cucumber_report.html',
                theme: 'bootstrap',
                tags: grunt.option('tags'),
                saveJson: true,
                debug: true,
                debugger: grunt.option('cucumber-debug') || false,
                strict: true,
                require: grunt.option('require', 'step_definitions/')
            }
        },
        'smoke': {
            options: {
                format: 'html',
                output: 'report/cucumber_report.html',
                theme: 'bootstrap',
                tags: grunt.option('tags') || '@p1',
                saveJson: true,
                debug: true,
                debugger: grunt.option('cucumber-debug') || false,
                strict: true,
                require: grunt.option('require', 'step_definitions/')
            }
        }
    };
};
