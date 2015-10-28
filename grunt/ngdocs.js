module.exports = function (grunt, tasks) {
    grunt.loadNpmTasks('grunt-ngdocs');

    tasks.ngdocs = {
        options: {
            dest: 'build/docs',
            html5Mode: true
            //startPage: '/ui',
            //title: "API Documentation",
            //titleLink: "/ui",
            //inlinePartials: true,
            //bestMatch: true
        },
        api: {
            src: ['src/**/*.js', '!src/**/*.spec.js'],
            title: 'API Documentation'
        }
    };

    return tasks;
};
