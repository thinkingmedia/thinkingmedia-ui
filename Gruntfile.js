/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {

    if (grunt.file.exists('../grunt-thinkingmedia')) {
        grunt.loadTasks('../grunt-thinkingmedia/tasks');
    } else {
        grunt.loadNpmTasks('grunt-thinkingmedia');
    }

    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.initConfig({
        config: {
            name: 'thinkingmedia-ui',
            src: [
                'www/src/UI'
            ],
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
        },

        ngdocs: {
            options: {
                dest: './docs',
                html5Mode: false,
                startPage: '/ui',
                title: 'ThinkingMedia-UI',
                titleLink: 'https://github.com/thinkingmedia/thinkingmedia-ui',
                sourceLink: true,
                editLink: true,
                editExample: true,
                bestMatch: true,
                scripts: [
                    'www/bower/jquery/dist/jquery.min.js',
                    'www/bower/lodash/dist/lodash.min.js',
                    'www/bower/angular/angular.min.js',
                    'www/bower/angular-animate/angular-animate.min.js',
                    'www/bower/angular-assert/dist/angular-assert.js',
                    'dist/js/thinkingmedia-ui.min.js',
                    'www/src/Docs/Docs.js'
                ],
                styles: [
                    'www/css/thinkingmedia-ui.css'
                ]
            },
            components: {
                api: true,
                src: [
                    'www/src/UI/**/*.js'
                ],
                title: "API"
            }
        }
    });

    grunt.task.registerTask('push-pages', function(){
        var shell = require('shelljs');
        shell.exec('git subtree split --prefix docs -b gh-pages');
        shell.exec('git push -f origin gh-pages:gh-pages');
        shell.exec('git branch -D gh-pages')
    });

    grunt.task.registerTask('docs', ['build', 'ngdocs']);
};
