module.exports = function (grunt) {
    // URI paths for our tasks to use
    grunt.dist = './dist/';
    grunt.uriTask = './grunt/';
    grunt.uriSrc = './src/UI';
    grunt.uriBuild = './build/';
    //grunt.uri = './www/';
    //grunt.uriCss = grunt.uri + 'css/';
    //grunt.uriImg = grunt.uri + 'img/';
    //grunt.uriJs = grunt.uri + 'js/';
    //grunt.uriSrc = grunt.uri + 'src/';

    // Vendor JS files relative to www
    grunt.vendor_js = [
        //'bower/lodash/lodash.min.js',
        //'bower/jquery/dist/jquery.min.js',
        //'bower/angular/angular.js',
        //'bower/angular-animate/angular-animate.min.js',
        //'bower/angular-ui-router/release/angular-ui-router.min.js',
        //'bower/angular-assert/dist/angular-assert.js',
    ];

    // Vendor CSS files relative to www
    grunt.vendor_css = [
        //'https://fonts.googleapis.com/icon?family=Material+Icons',
        //'bower/normalize.css/normalize.css'
    ];

    // Our task object where we'll store our configuration
    var tasks = {};
    tasks.pkg = grunt.file.readJSON('package.json');
    tasks.concat = {};

    // General tasks
    tasks = require(grunt.uriTask + 'clean.js')(grunt, tasks);
    tasks = require(grunt.uriTask + 'watch.js')(grunt, tasks);

    // Concatenation Tasks
    tasks = require(grunt.uriTask + 'concat-js.js')(grunt, tasks);

    // Compass Tasks
    tasks = require(grunt.uriTask + 'sass.js')(grunt, tasks);

    // Minify Tasks
    tasks = require(grunt.uriTask + 'minify-html.js')(grunt, tasks);
    tasks = require(grunt.uriTask + 'minify-js.js')(grunt, tasks);

/*
    grunt.registerTask('minify', [
        'cssmin',
        'htmlmin:prod',
        'uglify'
    ]);
 */

    grunt.registerTask('build', [
        'clean',
        'sass:prod',
        'sass:dev',
        'htmlmin:prod',
        'concat:js',
        'uglify:js',
        'clean'
    ]);
    grunt.registerTask('default', [
        'build'
    ]);

    // Initialize The Grunt Configuration
    grunt.initConfig(tasks);
};
