/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-thinkingmedia');

    grunt.initConfig({
        config: {
            build: './dist'
        }
    });
};
