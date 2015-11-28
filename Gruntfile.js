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
            cssMin: {
                options: {
                    clear: [
                        './dist/css/UI/thinkingmedia-ui.css'
                    ]
                },
                src: './dist/css/UI/thinkingmedia-ui.css',
                dest: './dist/thinkingmedia-ui.min.css'
            },
            cssFull: {
                src: './www/css/UI/thinkingmedia-ui.css',
                dest: './dist/thinkingmedia-ui.css'
            },
            cssMap: {
                src: './www/css/UI/thinkingmedia-ui.map',
                dest: './dist/thinkingmedia-ui.map'
            }
        }
    });
};
