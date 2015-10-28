module.exports = function (grunt, tasks) {
    grunt.loadNpmTasks('grunt-contrib-uglify');

    tasks.uglify = {
        js: {
            expand: true,
            dest: grunt.dist,
            src: [
                grunt.dist + 'thinkingmedia-ui.js'
            ],
            ext: '.min.js',
            flatten: true
        }
    };

    return tasks;
};
