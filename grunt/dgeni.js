module.exports = function (grunt, tasks) {
    grunt.loadNpmTasks('grunt-dgeni');

    tasks.dgeni = {
        options: {
            packages: [
                'dgeni-markdown',
                'dgeni-packages/ngdoc'
            ],
            basePath: grunt.uriSrc
        },
        src: [
            grunt.uriSrc + '/**/*.js'
        ],
        dest: grunt.uriBuild + 'docs/'
    };

    return tasks;
};
