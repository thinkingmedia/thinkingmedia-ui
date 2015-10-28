module.exports = function (grunt, tasks) {
    grunt.loadNpmTasks('grunt-contrib-sass');

    tasks.sass = {
        prod: {
            options: {
                compass: true,
                sourcemap: 'none',
                style: 'compressed'
            },
            files: [{
                expand: true,
                src: [grunt.uriSrc + "/UI.scss"],
                rename: function() {
                    return grunt.dist + "thinkingmedia-ui.min.css"
                }
            }]
        },
        dev: {
            options: {
                compass: true,
                lineNumbers: true
            },
            files: [{
                expand: true,
                src: [grunt.uriSrc + "/UI.scss"],
                //dest: grunt.dist,
                //ext: '.css',
                //flatten: true,
                rename: function() {
                    return grunt.dist + "thinkingmedia-ui.css"
                }
            }]
        }
    };

    return tasks;
};
