module.exports = function (grunt, tasks) {
    grunt.loadNpmTasks('grunt-ngdocs');

    tasks.ngdocs = {
        options: {
            dest: 'docs',
            html5Mode: false,
            startPage: '/api',
            title: "ThinkingMedia UI",
            titleLink: "https://github.com/thinkingmedia/thinkingmedia-ui",
            sourceLink: true,
            editLink: true,
            editExample: true
            //inlinePartials: true,
            //bestMatch: true
        },
        api: {
            src: ['src/**/*.js'],
            title: 'API Documentation'
        }
    };

    return tasks;
};
