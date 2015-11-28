/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {

    if(grunt.file.exists('.extra/grunt-thinkingmedia')) {
        grunt.loadTasks('.extra/grunt-thinkingmedia/tasks');
    } else {
        grunt.loadNpmTasks('grunt-thinkingmedia');
    }

    grunt.initConfig({
        config: {
            build: './dist'
        },

        package: {
            css: {
                src: './www/css/thinkingmedia-ui.css',
                dest: './dist/css/thinkingmedia-ui.css'
            },
            map: {
                src: './www/css/thinkingmedia-ui.map',
                dest: './dist/css/thinkingmedia-ui.map'
            }
        }
    });
};
