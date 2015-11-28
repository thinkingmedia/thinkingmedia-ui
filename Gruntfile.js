/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {
    //grunt.loadNpmTasks('grunt-thinkingmedia');
    grunt.loadTasks('.extra/grunt-thinkingmedia/tasks');

    grunt.initConfig({
        config: {
            build: './dist'
        }
    });
};
