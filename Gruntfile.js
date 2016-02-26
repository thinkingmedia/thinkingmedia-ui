/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {

    if(grunt.file.exists('../grunt-thinkingmedia')) {
        grunt.loadTasks('../grunt-thinkingmedia/tasks');
    } else {
        grunt.loadNpmTasks('grunt-thinkingmedia');
    }

    grunt.initConfig({
        config: {
            name: 'thinkingmedia-ui',
            build: './dist'
        },

        index: {
            dev: {
                options: {
                    js: [
                        'bower/lodash/lodash.min.js',
                        'bower/jquery/dist/jquery.min.js',
                        'bower/angular/angular.js'
                    ],
                    css: [
                        'css/thinkingmedia-ui.css'
                    ],
                    include: {
                        cwd: 'www',
                        src: [
                            'src/**/*.js',
                            '!**/*.test.js'
                        ]
                    }
                },
                src: './www/_index.html',
                dest: './www/index.html'
            }
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
