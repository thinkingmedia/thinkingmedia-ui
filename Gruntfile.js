// Helpers for custom tasks, mainly around promises / exec
var exec = require('faithful-exec');
var shjs = require('shelljs');

module.exports = function (grunt) {
    // URI paths for our tasks to use
    grunt.dist = './dist/';
    grunt.uriTask = './grunt/';
    grunt.uriSrc = './src/UI';
    grunt.uriBuild = './build/';

    function promising(task, promise) {
        var done = task.async();
        promise.then(function () {
            done();
        }, function (error) {
            grunt.log.write(error + '\n');
            done(false);
        });
    }

    function system(cmd) {
        grunt.log.write('% ' + cmd + '\n');
        return exec(cmd).then(function (result) {
            grunt.log.write(result.stderr + result.stdout);
        }, function (error) {
            grunt.log.write(error.stderr + '\n');
            throw 'Failed to run \'' + cmd + '\'';
        });
    }

    function ensureCleanMaster() {
        return exec('git symbolic-ref HEAD').then(function (result) {
            if (result.stdout.trim() !== 'refs/heads/master') throw 'Not on master branch, aborting';
            return exec('git status --porcelain');
        }).then(function (result) {
            if (result.stdout.trim() !== '') throw 'Working copy is dirty, aborting';
        });
    }

    // Each task has it's own JS file.
    var tasks = {};
    tasks.pkg = grunt.file.readJSON('package.json');

    // General tasks
    tasks = require(grunt.uriTask + 'clean.js')(grunt, tasks);
    tasks = require(grunt.uriTask + 'watch.js')(grunt, tasks);

    // Concatenation Tasks
    tasks = require(grunt.uriTask + 'concat-js.js')(grunt, tasks);

    // Documentation Generator
    tasks = require(grunt.uriTask + 'ngdocs.js')(grunt, tasks);

    // Compass Tasks
    tasks = require(grunt.uriTask + 'sass.js')(grunt, tasks);

    // Minify Tasks
    tasks = require(grunt.uriTask + 'minify-html.js')(grunt, tasks);
    tasks = require(grunt.uriTask + 'minify-js.js')(grunt, tasks);

    grunt.registerTask('docs', 'Generate documentation', [
        'ngdocs'
    ]);

    grunt.registerTask('build', 'Perform a normal build', [
        'clean',
        'sass:prod',
        'sass:dev',
        'htmlmin:prod',
        'concat:js',
        'uglify:js',
        'ngdocs'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('publish', 'Publish a clean build, docs, and sample to github.io', function () {
        promising(this,
            ensureCleanMaster()
                .then(function () {
                    return system('git checkout gh-pages');
                }).then(function () {
                    return system('git add --all');
                }).then(function () {
                    return system('git commit -m "Automatic gh-pages build"');
                }).then(function () {
                    return system('git push');
                }).then(function () {
                    return system('git checkout master');
                })
        );
    });

    // Initialize The Grunt Configuration
    grunt.initConfig(tasks);
};
