module.exports = function(grunt, tasks)
{
	grunt.loadNpmTasks('grunt-contrib-uglify');

	tasks.uglify = {
		dist: {
			cwd:     grunt.uriBuild + "js",
			dest:    grunt.uriBuild + "js",
			expand:  true,
			ext:     '.min.js',
			flatten: false,
			src:     [
				'**/*.js'
			]
		}
	};

	return tasks;
};
